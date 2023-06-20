import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  //** 로그인 하기 */
  @Mutation(() => String) //리턴타입 String
  logIn(
    @Args('email') email: string, //
    @Args('password') password: string,
  ): Promise<string> {
    return this.authService.logIn({ email, password });
  }
}
