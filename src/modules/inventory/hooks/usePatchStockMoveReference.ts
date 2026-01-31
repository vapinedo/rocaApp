import { useState } from 'react';
import { patchStockMoveReference } from '../../../core/mockApi';
import type { StockMove } from '../../../core/mockApi';

export function usePatchStockMoveReference() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StockMove | null>(null);

  const patchReference = async (id: string, reference: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await patchStockMoveReference(id, reference);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Error al editar referencia');
    } finally {
      setLoading(false);
    }
  };

  return { patchReference, loading, error, data };
}
