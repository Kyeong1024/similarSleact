import {
  HttpException,
  Injectable,
  NotAcceptableException,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async join(email: string, password: string, nickname: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new Error('이미존재하는 사용자 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
