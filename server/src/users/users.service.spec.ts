import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm/repository/Repository';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('UsersService', () => {
  let service: UsersService;
  // let spyUserFindOne: jest.SpyInstance;
  let userRepository: Repository<User>;
  let spyUserFindOne: jest.SpyInstance;
  let spyUserFind: jest.SpyInstance;
  let spiedRepositorySaveMethod: jest.SpyInstance;

  const dto = {
    userID: 100,
    email: 'aman.verma2323@docquity.com',
    password: 'Aman@1234',
    firstname: 'Aman',
    mobile: '1234567899',
    lastname: 'Verma',
  };
  const mockUserRepository = {
    save: jest.fn().mockImplementation((dto) => {
      return { id: Date.now(), ...dto };
    }),
    findOne: jest.fn().mockImplementation(({ email }) => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          // useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    spyUserFindOne = jest.spyOn(userRepository, 'findOne');
    spiedRepositorySaveMethod = jest.spyOn(userRepository, 'save');
    spyUserFind = jest.spyOn(userRepository, 'find');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should not create a user', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(dto));
    expect(await service.create(dto)).toEqual({
      code: false,
      message: 'User Already Exist',
    });
    expect(spyUserFindOne).toHaveBeenCalledTimes(1);
  });

  it('has called with valid data and create a user', async () => {
    const createUserDto = {
      userID: dto.userID,
      email: dto.email,
      firstname: dto.firstname,
      lastname: dto.lastname,
      password: dto.password,
      mobile: dto.mobile,
    };
    const Dto = plainToInstance(CreateUserDto, createUserDto);
    console.log(Dto);
    const error = await validate(Dto);
    console.log(error);
    expect(error.length).toBe(0);
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(null));
    spiedRepositorySaveMethod.mockResolvedValue(createUserDto);
    const createUserResult = await service.create(createUserDto);
    expect(spiedRepositorySaveMethod).toHaveBeenCalledTimes(1);
    expect(spyUserFindOne).toHaveBeenCalledTimes(1);
    expect(createUserResult).toEqual({
      code: true,
      message: 'New User Created..',
    });
  });
  it('should not create user as valida data is not entered', async () => {
    const createUserDto = {
      userID: dto.userID,
      email: 'aman.verma@doc',
      firstname: dto.firstname,
      lastname: dto.lastname,
      password: 'aman',
      mobile: dto.mobile,
    };
    const Dto = plainToInstance(CreateUserDto, createUserDto);
    console.log(Dto);
    const error = await validate(Dto);
    console.log(error);
    expect(error.length).toBe(2);
  });

  it('should return a table', async () => {
    spyUserFind.mockImplementationOnce(() => [dto]);
    const users = await service.get();
    expect(users).toEqual([dto]);
  });
});
