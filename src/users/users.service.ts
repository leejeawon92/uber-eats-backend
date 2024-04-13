import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User) private readonly users: Repository<User>) {
  }

  async createAccount({ email, password, role}: CreateAccountInput): Promise<string | undefined> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return '이미 이메일이 존재합니다.';
      }
      await this.users.save(this.users.create({ email, password, role }));
    } catch (e) {
      return "계정을 생성할 수 없습니다.";
    }
  }
}