import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResendVerifyDto } from './dto/resend-verify.dto';
import { ChangeDto } from './dto/change.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Throttle } from '@throttle/throttle';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  // #########################################################
  // USER REGISTRATION
  // #########################################################

  @Public()
  @Throttle({ limit: 5, ttl: 3600 }) // 5 registrations per hour
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - User already exists or validation failed',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // #########################################################
  // EMAIL VERIFICATION
  // #########################################################

  @Public()
  @Throttle({ limit: 10, ttl: 300 }) // 10 attempts per 5 minutes
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify user email with verification token' })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid token or already verified',
  })
  async verifyEmail(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyEmail(verifyDto);
  }

  @Public()
  @Throttle({ limit: 3, ttl: 900 }) // 3 resends per 15 minutes
  @Post('resend-verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend verification email with new token' })
  @ApiResponse({
    status: 200,
    description: 'Verification email resent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Email already verified or validation failed',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async resendVerifyEmail(@Body() resendVerifyDto: ResendVerifyDto) {
    return this.authService.resendVerifyEmail(resendVerifyDto);
  }

  // #########################################################
  // USER LOGIN & LOGOUT
  // #########################################################

  @Public()
  @Throttle({ limit: 5, ttl: 900 }) // 5 login attempts per 15 minutes
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Email not verified, banned, or timed out',
  })
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return this.authService.login(loginDto, request);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user and destroy session' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout(@Req() request: Request) {
    await this.authService.logout(request);
    return {
      message: 'Logout successful',
    };
  }

  // #########################################################
  // USER CHANGE, FORGOT & RESET PASSWORD
  // #########################################################

  @Throttle({ limit: 5, ttl: 3600 }) // 5 password changes per hour
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password for authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Current password incorrect or new password invalid',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
  })
  async changePassword(
    @Body() changeDto: ChangeDto,
    @Req() request: Request,
  ) {
    return this.authService.changePassword(changeDto, request);
  }

  @Public()
  @Throttle({ limit: 3, ttl: 3600 }) // 3 password reset requests per hour
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent if account exists',
  })
  async forgotPassword(@Body() forgotDto: ForgotDto) {
    return this.authService.forgotPassword(forgotDto);
  }

  @Public()
  @Throttle({ limit: 5, ttl: 300 }) // 5 reset attempts per 5 minutes
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using reset token' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid or expired token',
  })
  async resetPassword(@Body() resetDto: ResetDto) {
    return this.authService.resetPassword(resetDto);
  }
}
