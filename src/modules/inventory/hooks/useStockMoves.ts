import { useState, useEffect } from 'react';
import { getStockMoves } from '../../../core/mockApi';
import type { StockMove } from '../../../core/mockApi';

export function useStockMoves(filters: {
  product?: string;
  warehouse?: string;
  type?: 'IN' | 'OUT' | 'ADJUST';
  page?: number;
  pageSize?: number;
}) {
  const [data, setData] = useState<StockMove[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getStockMoves(filters)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar movimientos');
      })
      .finally(() => setLoading(false));
  }, [filters.product, filters.warehouse, filters.type, filters.page, filters.pageSize]);

  return { data, total, loading, error };
}
