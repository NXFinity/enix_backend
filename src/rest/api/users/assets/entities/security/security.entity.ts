import { BaseEntity } from '@database/database';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../user.entity';

@Entity('usersSecurity', { schema: 'accounts' })
export class Security extends BaseEntity {
  // User Verification
  verificationToken: string;
  isVerified: boolean;
  dateVerified: () => string;
  // ########################################################

  // User Refresh
  refreshToken: string;
  // ########################################################

  // User Two Factor
  isTwoFactorEnabled: boolean;
  twoFactorSecret: string;
  twoFactorToken: string;
  twoFactorBackupCodes: string[];
  // ########################################################

  // User Moderation - Bans
  isBanned: boolean;
  banReason: string;
  bannedUntil: Date;
  bannedBy: User;
  bannedAt: Date;
  // ########################################################

  // User Moderation - Timed Out
  isTimedOut: boolean;
  timeoutReason: string;
  timedOutUntil: Date;
  timedOutBy: User;
  // ########################################################

  // User Age Verification
  isAgedVerified: boolean;
  agedVerifiedDate: Date;
  // ########################################################

  @OneToOne(() => User, (user) => user.security, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'securityId' })
  user: User;
}
