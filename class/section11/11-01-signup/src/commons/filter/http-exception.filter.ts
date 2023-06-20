import {
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus;
    const message = exception.message;

    console.log('****************************');
    console.log('예외 발생');
    console.log('예외 내용' + message);
    console.log('예외 코드' + status);
    console.log('****************************');
  }
}

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException) {
    const status = exception.getStatus;
    const message = exception.message;

    console.log('****************************');
    console.log('예외 발생');
    console.log('예외 내용' + message);
    console.log('예외 코드' + status);
    console.log('****************************');
  }
}
