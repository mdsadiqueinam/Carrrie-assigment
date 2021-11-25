import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/routes-decorator/public-routes.decorator';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';

@ApiTags('Auth')
@Controller('user')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  // used [Public] decorator to use this route without authorization
  /**
   * returns object with access-token in it
   */
  @Public()
  @Post('register')
  @ApiResponse({
    type: 'string'
  })
  async register(@Body() registerCredentials: RegisterCredentialsDto) {
    const result = await this.authService.register(registerCredentials)
    return result
  }
  
  // used [Public] decorator to use this route without authorization
  /**
   * User can use either username or email to login in his/her account and
   * returns object with access-token in it
   */
  @Public()
  @Post('login')
  @ApiResponse({
    type: 'string'
  })
  async login(@Body() loginCredentials: LoginCredentialsDto) {
    const result = await this.authService.login(loginCredentials);
    return result;
  }
}
