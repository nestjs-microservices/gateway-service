import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserPayload {
  @IsEmail()
  email: string;

  password: string;
}
