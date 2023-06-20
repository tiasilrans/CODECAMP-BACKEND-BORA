import { BoardsService } from './boards.service';
import { Query, Resolver } from '@nestjs/graphql';

//@Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  //@Get()
  @Query(() => String)
  getHello(): string {
    return this.boardsService.getHello();
  }
}

//@nestjs/graphql @nestjs/apollo @apollo/server graphql
