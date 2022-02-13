import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserPayload {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
