import { BaseEntity } from '@database/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user.entity';

@Entity('userSecurity', { schema: 'account' })
export class Security extends BaseEntity {
  // User Verification
  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null;
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;
  @Column({ type: 'timestamptz', nullable: true })
  dateVerified: Date | null;
  // ########################################################

  // User Refresh
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;
  // ########################################################

  // Password Reset
  @Column({ type: 'varchar', nullable: true })
  passwordResetToken: string | null;
  @Column({ type: 'timestamptz', nullable: true })
  passwordResetTokenExpires: Date | null;
  // ########################################################

  // User Two Factor
  @Column({ type: 'boolean', default: false })
  isTwoFactorEnabled: boolean;
  @Column({ type: 'varchar', nullable: true })
  twoFactorSecret: string;
  @Column({ type: 'varchar', nullable: true })
  twoFactorToken: string;
  @Column({ type: 'simple-array', nullable: true })
  twoFactorBackupCodes: string[];
  // ########################################################

  // User Moderation - Bans
  @Column({ type: 'boolean', default: false })
  isBanned: boolean;
  @Column({ type: 'varchar', nullable: true })
  banReason: string;
  @Column({ type: 'timestamptz', nullable: true })
  bannedUntil: Date;
  @ManyToOne(() => User, { nullable: true })
  bannedBy: User;
  @Column({ type: 'timestamptz', nullable: true })
  bannedAt: Date;
  // ########################################################

  // User Moderation - Timed Out
  @Column({ type: 'boolean', default: false })
  isTimedOut: boolean;
  @Column({ type: 'varchar', nullable: true })
  timeoutReason: string;
  @Column({ type: 'timestamptz', nullable: true })
  timedOutUntil: Date;
  @ManyToOne(() => User, { nullable: true })
  timedOutBy: User;
  // ########################################################

  // User Age Verification
  @Column({ type: 'boolean', default: false })
  isAgedVerified: boolean;
  @Column({ type: 'timestamptz', nullable: true })
  agedVerifiedDate: Date;
  // ########################################################

  @OneToOne(() => User, (user) => user.security, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'securityId' })
  user: User;
}
