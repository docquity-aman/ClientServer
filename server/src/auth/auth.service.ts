/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    console.log(user);
    console.log(password);
    if (user == null) {
      console.log('returning..null');
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    console.log('Invalid id or password!');
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.userID };
    return {
      code: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
