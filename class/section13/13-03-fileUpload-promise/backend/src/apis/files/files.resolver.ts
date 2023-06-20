import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => String)
  uploadFile(
    //yarn add graphql-upload
    //yarn add --dev @types/graphql-upload
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): //브라우저에서 파일 받아오기
  Promise<string> {
    return this.filesService.upload({ file });
  }
}
