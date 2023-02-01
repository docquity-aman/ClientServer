import { Test, TestingModule } from '@nestjs/testing';
import { isEmail, IS_EMAIL } from 'class-validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.create({
        email: 'aman.verma@docquity.com',
        password: 'Aman@1234',
        firstname: 'Aman',
        mobile: '1234567890',
        lastname: 'Verma',
        userID: 0,
      }),
    ).toEqual({
      userID: 0,
      id: expect.any(Number),
      email: expect.any(String),
      password: 'Aman@1234',
      firstname: 'Aman',
      mobile: '1234567890',
      lastname: 'Verma',
    });
  });
});
