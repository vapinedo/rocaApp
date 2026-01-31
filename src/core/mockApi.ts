import { stockDB } from './stockDB';
import type { StockMove } from '../shared/models/stockMove';

export function login(username: string, password: string): Promise<{ token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        resolve({ token: 'mock-token' });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 500);
  });
}

export function getStockMoves({
  product,
  warehouse,
  type,
  page = 1,
  pageSize = 10,
}: {
  product?: string;
  warehouse?: string;
  type?: import('../shared/constants/stockMoveTypes').STOCK_MOVE;
  page?: number;
  pageSize?: number;
}): Promise<{ data: StockMove[]; total: number }> {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = stockDB;
      if (product) filtered = filtered.filter((m) => m.product.includes(product));
      if (warehouse) filtered = filtered.filter((m) => m.warehouse === warehouse);
      if (type) filtered = filtered.filter((m) => m.type === type);
      const total = filtered.length;
      const data = filtered.slice((page - 1) * pageSize, page * pageSize);
      resolve({ data, total });
    }, 500);
  });
}

export function getStockMoveById(id: string): Promise<StockMove> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  
      const move = stockDB.find((m) => m.id === id);
      if (move) resolve(move);
      else reject(new Error('Movimiento no encontrado'));
    }, 500);
  });
}

export function patchStockMoveReference(id: string, reference: string): Promise<StockMove> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (reference.length < 3 || reference.length > 60) {
        reject(new Error('La referencia debe tener entre 3 y 60 caracteres.'));
        return;
      }

      const idx = stockDB.findIndex((m) => m.id === id);

      if (idx === -1) {
        reject(new Error('Movimiento no encontrado'));
        return;
      }
      
      stockDB[idx] = { ...stockDB[idx], reference };
      resolve(stockDB[idx]);
    }, 500);
  });
}
