import { Injectable } from '@nestjs/common';

// Security DTO's
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../../rest/api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // #########################################################
  // VALIDATE USER - ALWAYS AT THE TOP
  // #########################################################

  async validateUser(email: string, password: string) {}

  // #########################################################
  // USER REGISTRATION & VERIFY EMAIL
  // #########################################################

  async register(registerDto: RegisterDto) {}

  async verifyEmail(verifyDto: VerifyDto) {}

  async resendVerifyEmail(email: string) {}

  // #########################################################
  // USER LOGIN & LOGOUT
  // #########################################################

  async login(loginDto: LoginDto) {}

  async logout() {}

  // #########################################################
  // USER CHANGE, FORGOT & RESET PASSWORD
  // #########################################################

  async changePassword(password: string) {}

  async forgotPassword(email: string) {}

  async resetPassword(email: string) {}
}
