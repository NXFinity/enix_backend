import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@database/database';
import { User } from './user.entity';

@Entity('userProfile', { schema: 'account' })
export class Profile extends BaseEntity {
  @Column({ length: 50, nullable: true })
  firstName: string;
  @Column({ length: 50, nullable: true })
  lastName: string;
  @Column({ length: 500, nullable: true })
  bio: string;
  @Column({ length: 50, nullable: true })
  location: string;
  @Column({ length: 50, nullable: true })
  website: string;
  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    default: 'https://i.postimg.cc/SxrVKbFk/hacker.png',
  })
  avatar: string;
  @Column({
    type: 'varchar',
    default: 'https://i.postimg.cc/k52jYYzB/cover-1.png',
  })
  cover: string;
  @Column({
    type: 'varchar',
    default: 'https://i.postimg.cc/Y26dPWn8/cover.png',
  })
  banner: string;
  @Column({
    type: 'varchar',
    default: 'https://i.postimg.cc/v8VzVVwF/offline.png',
  })
  offline: string;
  @Column({ type: 'varchar', nullable: true })
  chat: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profileId' })
  user: User;
}
