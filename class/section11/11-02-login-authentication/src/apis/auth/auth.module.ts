import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule, //Users 통째로 불러오기
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
