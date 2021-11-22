import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterCredentialsDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail({}, { message: 'email must be valid' }) 
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  
}