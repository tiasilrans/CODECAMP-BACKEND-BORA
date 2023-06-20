import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

interface IFilesServiseUpliad {
  file: FileUpload;
}

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiseUpliad): string {
    console.log(file);

    // 1. 파일을 클라우드 스토리이제 저장하는 로직
    // 1-1 스토리지 세팅하기
    // yarn add @google-cloud/storage
    const storage = new Storage({
      projectId: 'firm-shuttle-390007',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('code_camp_storage');

    // 1-2 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream())
      .on('finishi', () => {
        console.log('성공');
      })
      .on('error', () => {
        console.log('실패');
      });
    console.log('파일 전송이 완료되었습니다.');
    return '끝';
  }
}
