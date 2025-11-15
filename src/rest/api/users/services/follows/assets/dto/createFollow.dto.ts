import { ApiProperty, PartialType } from '@nestjs/swagger';

/**
 * DTO for follow operations
 * Currently minimal as follow operations use route parameters,
 * but kept for consistency and future expansion
 */
export class CreateFollowDto {
  // Future: Could add notification preferences, follow type, etc.
}

export class UpdateFollowDto extends PartialType(CreateFollowDto) {}

