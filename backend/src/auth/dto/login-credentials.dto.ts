import { IsString, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {

  @IsString()
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
}
