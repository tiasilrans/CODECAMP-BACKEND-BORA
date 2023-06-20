import { BoardsService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';

//@Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  //@Get()
  @Query(() => [Board])
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.createBoard({ createBoardInput });
  }
}

//@nestjs/graphql @nestjs/apollo @apollo/server graphql
