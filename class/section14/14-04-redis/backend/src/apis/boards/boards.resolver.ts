import { BoardsService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

//@Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  //@Get()
  @Query(() => String)
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('qqq');
    console.log(mycache);
    // 2. 조회완료 메시지 전달
    return '조회 완료';
    //레디스 연습을 위해 잠시 주석
    // return this.boardsService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    // 1. 캐시에 등록하는 연습
    this.cacheManager.set('qqq', createBoardInput, 0);
    //ttl은 캐시 manager의 경우 0이 영구저장

    // 2. 등록완료 메시지 전달
    return '캐시에 등록완료';

    //레디스 연습을 위해 잠시 주석
    // return this.boardsService.createBoard({ createBoardInput });
  }
}

//@nestjs/graphql @nestjs/apollo @apollo/server graphql
