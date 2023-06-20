import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//import {KakaoStrategy} from 'passport-kakao'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의 비밀번호',
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
