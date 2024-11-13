import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Order } from 'src/common/constants/enum';
import { PageMetaDto } from 'src/common/dtos/pageMeta.dto';
import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { ResponseItem } from 'src/common/dtos/responeItem';
import { ResponsePaginate } from 'src/common/dtos/responePaginate';
import { User } from 'src/entities';
import { CreateUserDto, ResponseListUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const res = await this.userRepository.save({
        ...createUserDto,
        fullName: createUserDto.fullName,
        password: await bcrypt.hash(createUserDto.password, 10),
        email: createUserDto.email,
      });
      return new ResponseItem(res, 'ADD_USER_SUCCESSFUL');
    } catch (error) {
      return new ResponseItem(null, 'ADD_USER_FAILED');
    }
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<ResponsePaginate<ResponseListUser>> {
    try {
      const data = this.userRepository
        .createQueryBuilder('users')
        .select(['users.email', 'users.fullName', 'users.id'])
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy('users.createdAt', Order.DESC);
      const [users, itemCount] = await data.getManyAndCount();
      const metaData = new PageMetaDto({ pageOptionsDto, itemCount });
      return new ResponsePaginate(users, metaData, 'LIST_ALL_USERS_FAILED');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return new ResponseItem(user, 'LIST_USER_DETAIL');
    } catch (error) {
      throw new ResponseItem(null, 'LIST_USER_DETAIL_FAILED');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) return new BadRequestException('USER_DOES_NOT_EXIST');
      await this.userRepository.update(id, updateUserDto);
      return new ResponseItem(null, 'UPDATED_USER_SUCCESS');
    } catch (error) {
      throw new ResponseItem(null, 'UPDATED_USER_FAILED');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) return new BadRequestException('USER_DOES_NOT_EXIST');
      await this.userRepository.delete(id);
      return new ResponseItem(null, 'DELETED_USER_SUCCESS');
    } catch (error) {
      throw new ResponseItem(null, 'DELETED_USER_FAILED');
    }
  }
}
