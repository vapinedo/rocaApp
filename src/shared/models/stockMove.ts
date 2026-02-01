import { STOCK_MOVE } from '@shared/constants/stockMoveTypes';

export interface StockMove {
  id: string;
  date: string;
  product: string;
  quantity: number;
  warehouse: string;
  reference: string;
  type: STOCK_MOVE;
}
