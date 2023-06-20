import { Injectable } from '@nestjs/common';
import {
  IUsersCreateService,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictExceptionFilter } from 'src/commons/filter/http-exception.filter';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //User를 인젝트 할거임
    private readonly usersRepository: Repository<User>, //
  ) {}

  //** 유저 찾기 */
  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // ** 유저 등록 */
  async create({
    email,
    password,
    name,
    age,
  }: IUsersCreateService): Promise<User> {
    // 1. 이메일 중복확인
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictExceptionFilter();

    // 2. 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 등록
    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
      //   email: email,
      //   password: password,
      //   name: name,
      //   age: age, //객체와 밸류명이 같을 경우 생략 가능
    });
  }
}
