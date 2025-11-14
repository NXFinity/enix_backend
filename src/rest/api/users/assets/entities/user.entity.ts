import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from '@database/database';
import { ROLE } from 'src/security/roles/assets/enum/role.enum';
import { Profile } from './profile.entity';
import { Privacy } from './security/privacy.entity';
import { Security } from './security/security.entity';

@Entity('user', { schema: 'account' })
@Index(['websocketId'])
@Index(['username'])
@Index(['email'])
@Index(['displayName'])
@Index(['role'])
@Index(['isPublic'])
export class User extends BaseEntity {
  // #########################################################
  // WebSocketID - Created as part of user registration
  @Column()
  websocketId: string;
  // #########################################################

  // Basic User information
  @Column({ unique: true, length: 50, nullable: false })
  username: string;
  @Column({ unique: true, length: 50, nullable: false })
  displayName: string;
  @Column({ unique: true, length: 255, nullable: false })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: ROLE, default: ROLE.Member })
  role: ROLE;

  // User Entities
  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profile: Profile;
  // #########################################################
  // Connected to Privacy Entity
  @Column({ type: 'boolean', default: true })
  isPublic?: boolean;
  @OneToOne(() => Privacy, (privacy) => privacy.user, { onDelete: 'CASCADE' })
  privacy: Privacy;
  // #########################################################
  // Account Security
  @OneToOne(() => Security, (security) => security.user, {
    onDelete: 'CASCADE',
  })
  security: Security;
  // #########################################################
}
