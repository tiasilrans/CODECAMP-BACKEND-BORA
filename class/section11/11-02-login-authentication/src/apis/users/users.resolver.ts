import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

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
}
