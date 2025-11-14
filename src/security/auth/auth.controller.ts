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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account. A verification email will be sent to the provided email address.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Registration successful. Please check your email to verify your account.',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            username: { type: 'string', example: 'johndoe' },
            displayName: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            websocketId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174001' },
            role: { type: 'string', example: 'Member' },
            dateCreated: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - User already exists or validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Registration failed. Please check your information and try again.'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
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
  @ApiOperation({
    summary: 'Verify user email with verification token',
    description:
      'Verifies a user email address using the token sent to their email. Tokens expire after 15 minutes.',
  })
  @ApiBody({ type: VerifyDto })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email successfully verified' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            username: { type: 'string', example: 'johndoe' },
            displayName: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid token or already verified',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Invalid or expired verification token'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async verifyEmail(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyEmail(verifyDto);
  }

  @Public()
  @Throttle({ limit: 3, ttl: 900 }) // 3 resends per 15 minutes
  @Post('resend-verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resend verification email with new token',
    description:
      'Resends a verification email with a new token. Previous tokens are invalidated. Rate limited to 3 requests per 15 minutes.',
  })
  @ApiBody({ type: ResendVerifyDto })
  @ApiResponse({
    status: 200,
    description: 'Verification email resent successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Verification email has been resent. Please check your email.',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Email already verified or validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Email has already been verified'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['User not found'],
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
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
  @ApiOperation({
    summary: 'Login user with email and password',
    description:
      'Authenticates a user with email and password. Creates a session and stores user data including websocketId. Rate limited to 5 attempts per 15 minutes.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Login successful' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            username: { type: 'string', example: 'johndoe' },
            displayName: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            websocketId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174001' },
            role: { type: 'string', example: 'Member' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Invalid email or password'],
        },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Email not verified, banned, or timed out',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Please verify your email before logging in'],
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return this.authService.login(loginDto, request);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user and destroy session',
    description:
      'Destroys the current user session and logs them out. Requires authentication.',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Logout successful' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Unauthorized'],
        },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change password for authenticated user',
    description:
      'Changes the password for the currently authenticated user. Requires current password verification. Rate limited to 5 changes per hour.',
  })
  @ApiBody({ type: ChangeDto })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Password changed successfully' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Current password incorrect or new password invalid',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Current password is incorrect'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not logged in',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Unauthorized'],
        },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
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
  @ApiOperation({
    summary: 'Request password reset email',
    description:
      'Sends a password reset email if an account with the provided email exists. Does not reveal whether the email exists for security. Rate limited to 3 requests per hour.',
  })
  @ApiBody({ type: ForgotDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent if account exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'If an account with that email exists, a password reset link has been sent.',
        },
      },
    },
  })
  async forgotPassword(@Body() forgotDto: ForgotDto) {
    return this.authService.forgotPassword(forgotDto);
  }

  @Public()
  @Throttle({ limit: 5, ttl: 300 }) // 5 reset attempts per 5 minutes
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset password using reset token',
    description:
      'Resets the user password using the token sent via email. Tokens expire after 1 hour. Rate limited to 5 attempts per 5 minutes.',
  })
  @ApiBody({ type: ResetDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Password has been reset successfully' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid or expired token',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Invalid or expired password reset token'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async resetPassword(@Body() resetDto: ResetDto) {
    return this.authService.resetPassword(resetDto);
  }
}
