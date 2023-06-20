import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  exports: [
    UsersService, //
    //다른 곳에서 UsersModule을 부르면
    //UsersService만 사용할 수 있음
  ],
  providers: [
    UsersResolver, //
    UsersService,
  ],
})
export class UsersModule {}
