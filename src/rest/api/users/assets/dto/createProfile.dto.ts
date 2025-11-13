import { PartialType } from '@nestjs/swagger';

export class CreateProfileDto {}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
