import { Test, TestingModule } from '@nestjs/testing';
import { demo } from 'src/test.dto';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;
  const dto = {
    userID: 100,
    email: 'aman.verma2323@docquity.com',
    password: 'Aman@1234',
    firstname: 'Aman',
    mobile: '1234567899',
    lastname: 'Verma',
  };

  const mockProfile = {
    get: jest.fn(() => {
      return { id: Date.now(), ...dto };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfile)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of user', async () => {
    expect(await controller.profile()).toEqual({
      id: Date.now(),
      ...dto,
    });
  });
});
