import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './assets/dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './assets/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './assets/entities/profile.entity';
import { Privacy } from './assets/entities/security/privacy.entity';
import { ROLE } from '../../../security/roles/assets/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Privacy)
    private readonly privacyRepository: Repository<Privacy>,
  ) {}

  // #########################################################
  // CREATE OPTIONS - ALWAYS AT THE TOP
  // #########################################################

  // User Creation
  async create(user: {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string;
    role?: ROLE.Member;
  }): Promise<User> {
    const findByEmail = await this.findByEmail(user.email);
    if (findByEmail) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.save(user);
    // Create Users Profile
    const profile = new Profile();
    profile.user = newUser;
    await this.profileRepository.save(profile);
    // Return User
    return newUser;
  }

  // #########################################################
  // FIND OPTIONS - AFTER CREATE
  // #########################################################

  // Find All Users
  async findAll() {
    try {
      return this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .select()
        .getMany();
    } catch (error) {
      console.error('Error finding all users:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to find all users');
    }
  }

  // Find by ID
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('user.id = :id', { id })
        .select() // keep this if you want all columns; later you can explicitly define what to select
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error finding user by id:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to find user by id');
    }
  }

  // Find by Username
  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('user.username = :username', { username })
        .select() // keep this if you want all columns; later you can explicitly define what to select
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }

      return user;
    } catch (error) {
      console.error(
        'Error finding user by username:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find user by username');
    }
  }

  // Find by Email Address
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('user.email = :email', { email })
        .select() // keep this if you want all columns; later you can explicitly define what to select
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error finding user by email:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  // #########################################################
  // UPDATE OPTIONS - AFTER FIND OPTIONS
  // #########################################################

  async updateUser(id: string, updateUserDto: UpdateUserDto) {}

  // #########################################################
  // DELETE OPTIONS - AFTER UPDATE OPTIONS - ALWAYS AT END
  // #########################################################

  async deleteUser(id: string, currentUser: User): Promise<void> {
    // Step 1: Find the user to delete
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Step 2: Allow self or admin
    if (currentUser.role !== ROLE.Administrator && currentUser.id !== id) {
      throw new ForbiddenException(
        'You do not have permission to delete this user',
      );
    }

    // Step 3: Hard delete (permanent)
    await this.userRepository.remove(user);
  }
}
