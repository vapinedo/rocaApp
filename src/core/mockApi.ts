import { stockDB } from '@core/stockDB';
import { delay } from '@shared/utils/delay.util';
import type { StockMove } from '@shared/models/stockMove';
import { STOCK_MOVE } from '@shared/constants/stockMoveTypes';

export type GetStockMovesParams = {
  page?: number;
  product?: string;
  type?: STOCK_MOVE;
  pageSize?: number;
  warehouse?: string;
};

export function login(username: string, password: string): Promise<{ token: string }> {
  return delay(() => {
    if (username && password) {
      return { token: 'mock-token' };
    } else {
      throw new Error('Credenciales inválidas');
    }
  });
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

export function getStockMoves(params: GetStockMovesParams): Promise<{ data: StockMove[]; total: number }> {
  const {
    product,
    warehouse,
    type,
    page = 1,
    pageSize = 10,
  } = params;

  return delay(() => {
    let filtered = stockDB;
    if (product) filtered = filtered.filter((m) => m.product.toLowerCase().includes(product.toLowerCase()));
    if (warehouse) filtered = filtered.filter((m) => m.warehouse === warehouse);
    if (type) filtered = filtered.filter((m) => m.type === type);
    const total = filtered.length;
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);
    return { data, total };
  });
}

export function getStockMoveById(id: string): Promise<StockMove> {
  return delay(() => {
    const move = stockDB.find((m) => m.id === id);
    if (move) return move;
    throw new Error('Movimiento no encontrado');
  });
}

export function patchStockMoveReference(id: string, reference: string): Promise<StockMove> {
  return delay(() => {
    if (reference.length < 3 || reference.length > 60) {
      throw new Error('La referencia debe tener entre 3 y 60 caracteres.');
    }

    const idx = stockDB.findIndex((m) => m.id === id);

    if (idx === -1) {
      throw new Error('Movimiento no encontrado');
    }

    stockDB[idx] = { ...stockDB[idx], reference };
    return stockDB[idx];
  });
}
