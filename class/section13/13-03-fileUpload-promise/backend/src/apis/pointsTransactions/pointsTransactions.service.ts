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

      // 2. User의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id }, //row 락
        lock: { mode: 'pessimistic_write' },
      });

      // 3. User의 돈 업데이트
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // await this.usersRepository.update(
      //   { id: _user.id }, //
      //   { point: user.point + amount },
      // );
      await queryRunner.commitTransaction();

      // 4. 최종결과 브라우저에 리턴
      return pointTransaction;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
