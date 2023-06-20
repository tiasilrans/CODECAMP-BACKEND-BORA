import { IAuthUser } from 'src/commons/interfaces/commons.interface';

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
