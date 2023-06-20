import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}
  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoards() {
    return '게시글 데이터 보내주기';
  }
}
