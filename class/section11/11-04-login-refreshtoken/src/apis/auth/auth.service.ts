import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  //** 로그인 하기 */
  async logIn({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 유저가 있는지 확인하기
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');

    // 2. 비번 검증하기
    const isAuthentication = await bcrypt.compare(password, user.password);
    if (!isAuthentication)
      throw new UnprocessableEntityException('패스워드를 확인해');

    //3. refresh token 만들어서 브라우저 쿠키에 저장해서 보내기
    this.setRefreshToken({ user, context });

    // 4. 로그인
    //    accessToken(=JWT)을 만들어서 브라우저에 전달
    return this.getAccessToken({ user });
  }
  //** */
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의 비밀번호', expiresIn: '1h' },
    );
  }

  //** */
  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의  리프레시 비밀번호', expiresIn: '2w' },
      //env로 빼주기 ↑
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domail=mybacksite.com; SameSite=None; Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontsite.com',
    // );
  }
}
