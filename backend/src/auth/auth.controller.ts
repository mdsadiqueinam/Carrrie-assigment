import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/routes-decorator/public-routes.decorator';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';

@Controller('user')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  /**
   * 
   * @param registerCredentials 
   * @returns object{ access_token: string }
   */
  // used [Public] decorator to use this route without authorization
  @Public()
  @Post('register')
  async register(@Body() registerCredentials: RegisterCredentialsDto) {
    const result = await this.authService.register(registerCredentials)
    return result
  }
  
  /**
   * 
   * @param loginCredentials 
   * @returns @object{ access_token: string }
   */
  // used [Public] decorator to use this route without authorization
  @Public()
  @Post('login')
  async login(@Body() loginCredentials: LoginCredentialsDto) {
    const result = await this.authService.login(loginCredentials);
    return result;
  }
}
