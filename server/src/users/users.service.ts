import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from '../auth/auth.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const isEmail = await this.findByEmail(createUserDto.email);
    if (isEmail) {
      return { message: 'User Already Exist', code: false };
    }
    const hash_password = await bcrypt.hash(
      createUserDto.password,
      jwtConstants.MY_SALT,
    );
    createUserDto.password = hash_password;
    this.userRepository.save(createUserDto);
    return { message: 'New User Created..', code: true };
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  update(updateUserDto: UpdateUserDto, mobile: number) {
    return this.userRepository.update(mobile, updateUserDto);
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
