import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log('*******JwtRefreshStrategy*********');
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken=asdlkfjqlkjwfdjkl
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의 리프레시 비밀번호',
      // 비밀번호 검증
      // 만료시간 검증
      // 검증 통과 후 validate 실행
    });
  }

  validate(payload) {
    console.log(payload); // { sub: askljdfklj-128930djk }
    return {
      id: payload.sub,
    };
  }
}
