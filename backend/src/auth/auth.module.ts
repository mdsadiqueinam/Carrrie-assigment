import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: jwtConstants.pri_key,
      publicKey: jwtConstants.pub_key,
      signOptions: { expiresIn: '1d', algorithm: 'RS256' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
