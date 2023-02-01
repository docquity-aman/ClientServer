import { Test, TestingModule } from '@nestjs/testing';
import { demo } from 'src/test.dto';
import { UsersService } from 'src/users/users.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  const dto = demo.dto;

  const mockService = {
    getUsers: jest.fn(() => {
      return [dto];
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockService)
      .compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of user', async () => {
    expect(await mockService.getUsers()).toEqual([dto]);
  });
});
