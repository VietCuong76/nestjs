import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { ResponseItem } from 'src/common/dtos/responeItem';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.fullName = createUserDto.fullName;
      user.password = await bcrypt.hash(createUserDto.password, 10);
      user.email = createUserDto.email;
      const res = await this.userRepository.save(user);
      return new ResponseItem(res, 'ADD_USER_SUCCESSFUL');
    } catch (error) {
      console.error(error);
      return new ResponseItem(null, 'ADD_USER_FAILED');
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return new ResponseItem(users, 'LIST_ALL_USERS');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
