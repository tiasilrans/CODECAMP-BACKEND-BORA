import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSATION_ATATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly daraSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const queryRunner = this.daraSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 1. PointTransaction 테이블에 거래기록 추가
      const pointTransaction = this.pointsTransactionsRepository.create({
        //등록을 위한 빈 객체 만들기
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSATION_ATATUS_ENUM.PAYMENT,
      });
      // insert 결과 못 받는 삽입
      // update 결과 못 받는 수정
      await queryRunner.manager.save(pointTransaction);
      //await this.pointsTransactionsRepository.save(pointTransaction);

      // 2. User의 돈 찾아서 업데이트 하기 // 숫자일때 가능
      const id = _user.id;
      await queryRunner.manager.increment(User, { id }, 'point', amount);

      await queryRunner.commitTransaction();

      // 3. 최종결과 브라우저에 리턴
      return pointTransaction;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
