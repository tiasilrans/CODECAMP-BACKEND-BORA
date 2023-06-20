import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/commons.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-auth.guard';

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
    @Context() context: IContext,
  ): Promise<string> {
    context;
    return this.authService.logIn({ email, password, context });
  }

  // refreshToken 인가
  @UseGuards(GqlAuthGuard('refresh')) //JwtRefreshStrategy
  @Mutation(() => String) //리턴타입 String
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    // accessToken 재발급
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
