import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

@Injectable()
export class BoardsService {
  findAll(): Board[] {
    ///1. 데이터 조회
    const result = [
      {
        number: 1,
        writer: '뀨잉',
        title: '이 몸 강 림',
        contents: '뀨하하하하하하!!',
      },
      {
        number: 2,
        writer: '뀨잉',
        title: '이 몸 강 림 ☆',
        contents: '뀨하하하하하하!!',
      },
      {
        number: 3,
        writer: '뀨잉',
        title: '★ 이 몸 강 림 ☆',
        contents: '뀨하하하하하하!!',
      },
    ];
    //2. 결과 브라우저에 전송
    return result;
  }
  createBoard({ createBoardInput }: IBoardsServiceCreate): string {
    //1. 리퀘스트 내용 확인
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    //2. DB에 저장
    //3. 결과 알림
    return '게시물 등록에 성공하였습니다.';
  }
}
