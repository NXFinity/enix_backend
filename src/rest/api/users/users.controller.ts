import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './assets/dto/createUser.dto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../../security/auth/guards/admin.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // #########################################################
  // CREATE OPTIONS - ALWAYS AT THE TOP
  // #########################################################

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // #########################################################
  // FIND OPTIONS - AFTER CREATE
  // #########################################################

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Administrator privileges required',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user with full access' })
  @ApiResponse({
    status: 200,
    description: 'Current user data retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  getMe(@Req() request: Request) {
    const userId = (request.user as any)?.id || (request.session as any)?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not found in session');
    }
    return this.usersService.getMe(userId);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Find user by username (public profile)' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // #########################################################
  // UPDATE OPTIONS - AFTER FIND OPTIONS
  // #########################################################

  @Patch('me')
  @ApiOperation({ summary: 'Update current authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Validation failed or field already taken',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  updateMe(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = (request.user as any)?.id || (request.session as any)?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not found in session');
    }
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update user by ID (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Validation failed or field already taken',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Administrator privileges required',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // #########################################################
  // DELETE OPTIONS - AFTER UPDATE OPTIONS - ALWAYS AT END
  // #########################################################

  @Delete('me')
  @ApiOperation({ summary: 'Delete current authenticated user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  deleteMe(@Req() request: Request) {
    const userId = (request.user as any)?.id || (request.session as any)?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not found in session');
    }
    return this.usersService.delete(userId);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Administrator privileges required',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
