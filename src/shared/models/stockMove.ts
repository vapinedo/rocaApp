import { STOCK_MOVE } from '../constants/stockMoveTypes';

export interface StockMove {
  id: string;
  date: string;
  product: string;
  quantity: number;
  warehouse: string;
  reference: string;
  type: STOCK_MOVE;
}
