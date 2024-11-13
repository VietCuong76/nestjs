import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities';
import { RequestLogin } from './dto/request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (user) {
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (comparePassword)
          return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
          };
      }
      return new UnauthorizedException('Tài khoản không đúng');
    } catch (error) {
      throw error;
    }
  }

  async login(userDTO: RequestLogin) {
    return {
      access_token: this.jwtService.sign(userDTO),
    };
  }
}
