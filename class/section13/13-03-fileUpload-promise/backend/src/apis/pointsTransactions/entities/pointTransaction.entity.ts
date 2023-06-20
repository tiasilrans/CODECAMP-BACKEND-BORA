import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSATION_ATATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCLE = 'CANCLE',
}

registerEnumType(POINT_TRANSATION_ATATUS_ENUM, {
  name: 'POINT_TRANSATION_ATATUS_ENUM',
});

@ObjectType()
@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSATION_ATATUS_ENUM })
  @Field(() => POINT_TRANSATION_ATATUS_ENUM)
  status: POINT_TRANSATION_ATATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;
}
