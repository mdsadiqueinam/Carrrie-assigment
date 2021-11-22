import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genPassword, validatePassword } from 'lib/utils';
import { UserService } from 'src/user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private genToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      "access-token": this.jwtService.sign(payload)
    };
  }

  private async validateUser(loginCredentials: LoginCredentialsDto) {
    const user = await this.userService.findOne(loginCredentials.usernameOrEmail);
    try {
      if (
        user &&
        validatePassword(loginCredentials.password, user.hash, user.salt)
      ) {
        return {
          username: user.username,
          id: user.id,
        };
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    return null;
  }

  private async validateNewUser(newUser: RegisterCredentialsDto) {
    let user = await this.userService.findOne(newUser.username);
    if (user) {
      throw new ConflictException('Username already taken');
    }
    user = await this.userService.findOne(newUser.email);
    if (user) {
      throw new ConflictException('Email already taken');
    }
  }

  async register(newUser: RegisterCredentialsDto) {
    await this.validateNewUser(newUser);
    const { hash, salt } = genPassword(newUser.password);
    const newUserData = {
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      hash,
      salt,
    };
    const createdUser = await this.userService.createNewUser(newUserData);
    return this.genToken(createdUser);
  }

  async login(loginCredentials: LoginCredentialsDto) {
    const user = await this.validateUser(loginCredentials);
    if (!user) {
      throw new NotAcceptableException('Invalid credential');
    }
    return this.genToken(user);
  }
}
