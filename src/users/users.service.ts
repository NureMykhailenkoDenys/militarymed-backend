import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(email: string, password: string, role: UserRole) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.repository.create({
      email,
      passwordHash,
      role,
    });

    return this.repository.save(user);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  findAll() {
    return this.repository.find();
  }
}
