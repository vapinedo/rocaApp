import { useQuery } from '@tanstack/react-query';
import { getStockMoves } from '../../../core/mockApi';

export type StockMoveType = 'IN' | 'OUT' | 'ADJUST';

export interface UseStockMovesFilters {
  page?: number;
  product?: string;
  pageSize?: number;
  warehouse?: string;
  type?: StockMoveType;
}

export function useStockMoves(filters: UseStockMovesFilters) {

  const query = useQuery({
    queryKey: ['stockMoves', filters],
    queryFn: () => getStockMoves(filters),
  });

  return {
    data: query.data?.data || [],
    total: query.data?.total || 0,
    loading: query.isLoading,
    error: query.isError ? (query.error as Error)?.message || 'Error al cargar movimientos' : null,
  };
}
