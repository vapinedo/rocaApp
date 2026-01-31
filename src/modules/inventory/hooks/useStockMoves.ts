import { useQuery } from '@tanstack/react-query';
import { getStockMoves } from '../../../core/mockApi';

export function useStockMoves(filters: {
  product?: string;
  warehouse?: string;
  type?: 'IN' | 'OUT' | 'ADJUST';
  page?: number;
  pageSize?: number;
}) {
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
