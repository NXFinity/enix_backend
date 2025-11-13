import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './createProfile.dto';
import { CreatePrivacyDto } from './createPrivacy.dto';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;

  displayName?: string;

  role?: ROLE;

  profile: CreateProfileDto;
  privacy: CreatePrivacyDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
