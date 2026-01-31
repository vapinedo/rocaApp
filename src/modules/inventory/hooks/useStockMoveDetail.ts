import { useQuery } from '@tanstack/react-query';
import { getStockMoveById } from '../../../core/mockApi';

export function useStockMoveDetail(id: string) {
  const query = useQuery({
    queryKey: ['stockMove', id],
    queryFn: () => getStockMoveById(id),
    enabled: !!id,
  });

  return {
    data: query.data || null,
    loading: query.isLoading,
    error: query.isError ? (query.error as Error)?.message || 'Error al cargar detalle' : null,
  };
}
