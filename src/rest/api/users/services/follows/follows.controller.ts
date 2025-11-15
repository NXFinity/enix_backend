import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Query,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FollowsService } from './follows.service';
import { CurrentUser } from 'src/security/auth/decorators/currentUser.decorator';
import { User } from '../../assets/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Throttle } from '@throttle/throttle';
import { AdminGuard } from 'src/security/auth/guards/admin.guard';

@ApiTags('Account Management | Follows')
@Controller('follows')
@ApiBearerAuth()
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  // #########################################################
  // FOLLOW OPTIONS
  // #########################################################

  @Post(':userId/follow')
  @Throttle({ limit: 30, ttl: 60 }) // 30 follows per minute
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({ name: 'userId', description: 'User ID to follow' })
  @ApiResponse({
    status: 201,
    description: 'Successfully followed user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (already following or self-follow)',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (privacy settings)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  followUser(@CurrentUser() user: User, @Param('userId') userId: string) {
    const followerId = user?.id;
    if (!followerId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.followUser(followerId, userId);
  }

  @Delete(':userId/follow')
  @Throttle({ limit: 30, ttl: 60 }) // 30 unfollows per minute
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({ name: 'userId', description: 'User ID to unfollow' })
  @ApiResponse({
    status: 200,
    description: 'Successfully unfollowed user',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not following this user' })
  unfollowUser(@CurrentUser() user: User, @Param('userId') userId: string) {
    const followerId = user?.id;
    if (!followerId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.unfollowUser(followerId, userId);
  }

  @Get(':userId/following')
  @ApiOperation({ summary: 'Get users that a user is following' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['dateCreated', 'username', 'displayName'],
    example: 'dateCreated',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by username or displayName',
    example: 'john',
  })
  @ApiResponse({
    status: 200,
    description: 'Following list retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getFollowing(
    @CurrentUser() user: User,
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto & { search?: string },
  ) {
    const currentUserId = user?.id;
    if (!currentUserId) {
      throw new UnauthorizedException('User ID not found');
    }
    // Users can only view their own following list
    if (currentUserId !== userId) {
      throw new UnauthorizedException(
        'You can only view your own following list',
      );
    }
    return this.followsService.getFollowing(userId, currentUserId, paginationDto);
  }

  @Get(':userId/followers')
  @ApiOperation({ summary: 'Get followers of a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['dateCreated', 'username', 'displayName'],
    example: 'dateCreated',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by username or displayName',
    example: 'john',
  })
  @ApiResponse({
    status: 200,
    description: 'Followers list retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getFollowers(
    @CurrentUser() user: User,
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto & { search?: string },
  ) {
    const currentUserId = user?.id;
    if (!currentUserId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.getFollowers(
      userId,
      currentUserId,
      paginationDto,
    );
  }

  @Post('batch-status')
  @ApiOperation({ summary: 'Batch check follow status for multiple users' })
  @ApiResponse({
    status: 200,
    description: 'Batch follow status retrieved successfully',
    schema: {
      type: 'object',
      additionalProperties: { type: 'boolean' },
      example: { 'user-id-1': true, 'user-id-2': false },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  batchFollowStatus(
    @CurrentUser() user: User,
    @Body() body: { userIds: string[] },
  ) {
    const followerId = user?.id;
    if (!followerId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.batchFollowStatus(followerId, body.userIds);
  }

  @Get(':userId/follow-status')
  @ApiOperation({ summary: 'Check if current user is following another user' })
  @ApiParam({ name: 'userId', description: 'User ID to check' })
  @ApiResponse({
    status: 200,
    description: 'Follow status retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  isFollowing(@CurrentUser() user: User, @Param('userId') userId: string) {
    const followerId = user?.id;
    if (!followerId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService
      .isFollowing(followerId, userId)
      .then((isFollowing) => ({
        isFollowing,
      }));
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get follow suggestions based on mutual connections' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Follow suggestions retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getFollowSuggestions(
    @CurrentUser() user: User,
    @Query('limit') limit?: number,
  ) {
    const userId = user?.id;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.getFollowSuggestions(userId, limit || 10);
  }

  @Get(':userId/stats')
  @ApiOperation({ summary: 'Get follow statistics for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Follow statistics retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getFollowStats(@CurrentUser() user: User, @Param('userId') userId: string) {
    const currentUserId = user?.id;
    if (!currentUserId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.getFollowStats(userId);
  }

  @Get(':userId/analytics')
  @ApiOperation({ summary: 'Get follow analytics for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Follow analytics retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getFollowAnalytics(
    @CurrentUser() user: User,
    @Param('userId') userId: string,
  ) {
    const currentUserId = user?.id;
    if (!currentUserId) {
      throw new UnauthorizedException('User ID not found');
    }
    // Users can only view their own analytics
    if (currentUserId !== userId) {
      throw new UnauthorizedException('You can only view your own analytics');
    }
    return this.followsService.getFollowAnalytics(userId);
  }

  @Delete('cooldown/:followerId/:followingId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Clear follow cooldown (admin only)' })
  @ApiParam({ name: 'followerId', description: 'Follower User ID' })
  @ApiParam({ name: 'followingId', description: 'Following User ID' })
  @ApiResponse({
    status: 200,
    description: 'Cooldown cleared successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (admin only)' })
  clearCooldown(
    @CurrentUser() user: User,
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
  ) {
    const currentUserId = user?.id;
    if (!currentUserId) {
      throw new UnauthorizedException('User ID not found');
    }
    return this.followsService.clearCooldown(followerId, followingId);
  }
}
