import { PartialType } from '@nestjs/swagger';

export class CreatePrivacyDto {}

export class UpdatePrivacyDto extends PartialType(CreatePrivacyDto) {}
