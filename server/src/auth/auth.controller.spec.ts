import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { demo } from 'src/test.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const mockjwtService = {
    sign: jest.fn().mockImplementation(() => {
      return {
        access_token: 'Gives_access_token',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository<User>,
          // useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockjwtService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('login should be defined', () => {
    expect(controller.login).toBeDefined();
  });
  const req = {
    user: {
      userID: 100,
      email: 'aman.verma2323@docquity.com',
      password: 'Aman@1234',
      firstname: 'Aman',
      mobile: '1234567899',
      lastname: 'Verma',
    },
  };
  console.log(req.user);
  it('should login the user', async () => {
    expect(await controller.login(req)).toEqual({
      code: true,
      access_token: {
        access_token: 'Gives_access_token',
      },
    });
  });
});
