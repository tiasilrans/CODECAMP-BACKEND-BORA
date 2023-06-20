import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/commons.interface';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  //유저 등록
  @Mutation(() => User) // 이 뮤테이션의 리턴 타입은 User타입이다
  createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
    //그래프큐엘이 number를 소수점을 가지고 인식해서 Int라고 알려줘야 함
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }

  //REST API 인가방식
  //@UseGuards(AuthGuard('access'))
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchUser(
    @Context() context: IContext, //
  ): string {
    // 유저정보 꺼내오기
    console.log('****************');
    console.log(context.req.user);
    console.log('****************');
    return '인가 성공';
  }
}
