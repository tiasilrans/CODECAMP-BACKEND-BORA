import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { ConflictException } from '@nestjs/common';
import { User } from '../entities/user.entity';

// 테스트 DB 만들기
class MockUsersRepository {
  mydb = [
    { email: 'test1@test.com', password: '0000', name: '짱구', age: 8 },
    { email: 'test2@test.com', password: '1234', name: '철수', age: 12 },
    { email: 'test3@test.com', password: '5678', name: '짱아', age: 5 },
  ];

  findOne({ where }) {
    const user = this.mydb.filter((el) => el.email === where.email);
    if (user.length) return user[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    //서비스 가져오기
    const usersModule = await Test.createTestingModule({
      // imports: : [TypeOrmModule...],
      // controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });
  //   describe('findOneByEmail', () => {
  //     it('하나의 이메일 찾기', () => {
  //       //
  //       const result = usersService.findOneByEmail({ email: 'test@test.com' });
  //       expect(result).toStrictEqual({
  //         email: 'test@test.com',
  //         name: '',
  //       });
  //     });
  //   });

  describe('create', () => {
    it('기존 데이터에 있는지 확인', async () => {
      const myData = {
        email: 'test@test.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('등록됐는지 확인', async () => {
      const myData = {
        email: 'test4@test.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        email: 'test4@test.com',
        password: '1234',
        name: '철수',
        age: 13,
      });
    });
  });
});
