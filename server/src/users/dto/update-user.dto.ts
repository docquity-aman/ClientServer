import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstname: string;

  lastname: string;

  @IsNotEmpty()
  @IsNumber()
  mobile: string;
}
