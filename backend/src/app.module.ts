import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './auth/auth-guard/jwt.auth-guard';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config()

/**
 * By declaring [JWTAuthGuard] with [APP_GUARD] in providers the [JWTAuthGuard] is used Globally
 * To use public routes use [Public] decorator with routes that does not require authorization
 */
@Module({
  imports: [MongooseModule.forRoot(process.env.ATLAS_URI), AuthModule, UserModule, TodoModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
