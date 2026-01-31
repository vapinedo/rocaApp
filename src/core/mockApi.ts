export type StockMove = {
  id: string;
  date: string;
  product: string;
  quantity: number;
  warehouse: string;
  reference: string;
  type: 'IN' | 'OUT' | 'ADJUST';
};

// Simulated database
let stockMoves: StockMove[] = [
  {
    id: '1',
    type: 'IN',
    quantity: 100,
    date: '2026-01-01',
    product: 'Producto A',
    warehouse: 'Bodega Central',
    reference: 'Ingreso inicial',
  },
  {
    id: '2',
    type: 'OUT',
    quantity: 20,
    reference: 'Venta',
    date: '2026-01-02',
    product: 'Producto B',
    warehouse: 'Bodega Norte',
  },
  // 18 movimientos adicionales
  ...Array.from({ length: 18 }, (_, i) => {
    const idx = i + 3;
    return {
      id: String(idx),
      type: ['IN', 'OUT', 'ADJUST'][i % 3] as 'IN' | 'OUT' | 'ADJUST',
      quantity: 10 * (i + 1),
      date: `2026-01-${(i % 28 + 3).toString().padStart(2, '0')}`,
      product: `Producto ${String.fromCharCode(67 + (i % 5))}`,
      warehouse: ['Bodega Central', 'Bodega Norte'][i % 2],
      reference: `Referencia ${idx}`,
    };
  }),
];

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
  type?: 'IN' | 'OUT' | 'ADJUST';
  page?: number;
  pageSize?: number;
}): Promise<{ data: StockMove[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = stockMoves;
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
      const move = stockMoves.find((m) => m.id === id);
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
      const idx = stockMoves.findIndex((m) => m.id === id);
      if (idx === -1) {
        reject(new Error('Movimiento no encontrado'));
        return;
      }
      stockMoves[idx] = { ...stockMoves[idx], reference };
      resolve(stockMoves[idx]);
    }, 500);
  });
}
