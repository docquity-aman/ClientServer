import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { demo } from 'src/test.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let spyUserFindOne: jest.SpyInstance;
  const mockjwtService = {
    sign: jest.fn().mockImplementation(() => {
      return {
        access_token: 'Gives_access_token',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: JwtService, useValue: mockjwtService },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          // useValue: mockUserRepository,
        },
      ],
    }).compile();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<AuthService>(AuthService);
    spyUserFindOne = jest.spyOn(userRepository, 'findOne');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const logindto = {
    email: 'aman.verma2323@docquity.com',
    password: 'Aman@1234',
  };
  it('validate a user from local startergy', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(demo.dtoDb));
    expect(
      await service.validateUser(logindto.email, logindto.password),
    ).toEqual(demo.dtoDb);
  });
  it('user should login', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(demo.dtoDb));
    expect(
      await service.validateUser(logindto.email, logindto.password),
    ).toEqual(demo.dtoDb);
    expect(await service.login(logindto)).toEqual({
      code: true,
      access_token: {
        access_token: 'Gives_access_token',
      },
    });
  });

  it('user should not login as password is wrong!', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(demo.dtoDb));
    expect(await service.validateUser(logindto.email, 'password')).toEqual(
      null,
    );
  });
});
