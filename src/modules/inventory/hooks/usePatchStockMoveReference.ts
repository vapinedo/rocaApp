
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchStockMoveReference } from '../../../core/mockApi';

export function usePatchStockMoveReference() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, reference }: { id: string; reference: string }) => patchStockMoveReference(id, reference),
    onSuccess: (data, variables) => {
      // Actualizar el cache del listado y del detalle
      queryClient.invalidateQueries({ queryKey: ['stockMoves'] });
      queryClient.invalidateQueries({ queryKey: ['stockMove', variables.id] });
    },
  });

  return {
    patchReference: (id: string, reference: string) => mutation.mutate({ id, reference }),
    loading: mutation.isPending,
    error: mutation.isError ? (mutation.error as Error)?.message || 'Error al editar referencia' : null,
    data: mutation.data || null,
  };
}
