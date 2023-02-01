import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  userID: number;

  @IsEmail()
  @Matches(/^[\w-\.]+@(docquity)\.+(com)$/, {
    message: 'Only Docquity Members can login!',
  })
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,}$/,
    { message: 'Password Invalid' },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  lastname: string;

  @IsNotEmpty()
  @Matches(/[1-9]{1}[0-9]{9}$/, { message: 'Only 10 digits allowed' })
  mobile: string;
}
