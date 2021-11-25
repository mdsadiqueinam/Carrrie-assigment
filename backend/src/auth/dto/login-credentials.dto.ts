import { IsString, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  
  
  /**
   * use either username or email to login
   */
  @IsString()
  @IsNotEmpty()
  usernameOrEmail: string;

  /**
   * Password to login
   */
  @IsString()
  @IsNotEmpty()
  password: string;
  
}
