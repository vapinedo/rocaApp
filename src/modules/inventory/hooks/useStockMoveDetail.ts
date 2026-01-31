import { useState, useEffect } from 'react';
import { getStockMoveById } from '../../../core/mockApi';
import type { StockMove } from '../../../core/mockApi';

export function useStockMoveDetail(id: string) {
  const [data, setData] = useState<StockMove | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getStockMoveById(id)
      .then((res) => setData(res))
      .catch((err) => setError(err.message || 'Error al cargar detalle'))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
