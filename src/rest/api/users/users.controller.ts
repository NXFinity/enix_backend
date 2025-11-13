import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto, UpdateUserDto } from './assets/dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // #########################################################
  // CREATE OPTIONS - ALWAYS AT THE TOP
  // #########################################################

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // #########################################################
  // FIND OPTIONS - AFTER CREATE
  // #########################################################

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // #########################################################
  // UPDATE OPTIONS - AFTER FIND OPTIONS
  // #########################################################

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // #########################################################
  // DELETE OPTIONS - AFTER UPDATE OPTIONS - ALWAYS AT END
  // #########################################################

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
