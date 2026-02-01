import { getStockMoves } from '@core/mockApi';
import { useQuery } from '@tanstack/react-query';
import { STOCK_MOVE } from '@shared/constants/stockMoveTypes';

export interface UseStockMovesFilters {
  page?: number;
  product?: string;
  pageSize?: number;
  warehouse?: string;
  type?: STOCK_MOVE;
}

export function useStockMoves(filters: UseStockMovesFilters) {

  const query = useQuery({
    queryKey: ['stockMoves', filters],
    queryFn: () => getStockMoves(filters),
    placeholderData: (prev) => prev,
  });

  return {
    data: query.data?.data || [],
    total: query.data?.total || 0,
    loading: query.isLoading,
    error: query.isError ? (query.error as Error)?.message || 'Error al cargar movimientos' : null,
  };
}
