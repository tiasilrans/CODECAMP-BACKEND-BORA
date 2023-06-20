import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
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
    await this.pointsTransactionsRepository.save(pointTransaction);

    // 2. User의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });
    // 3. User의 돈 업데이트
    await this.usersRepository.update(
      { id: _user.id }, //
      { point: user.point + amount },
    );

    // 4. 최종결과 브라우저에 리턴
    return pointTransaction;
  }
}
