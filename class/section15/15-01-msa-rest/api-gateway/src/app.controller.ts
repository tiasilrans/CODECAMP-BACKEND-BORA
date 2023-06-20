import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}
  @Post('/auth/login')
  login() {
    // Auth 서비스로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { cmd: 'login' },
      { enail: 'test@test.com', password: '1234' },
    );
  }

  @Get('/boards')
  fetchBoards() {
    // 리소스 서비스로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
