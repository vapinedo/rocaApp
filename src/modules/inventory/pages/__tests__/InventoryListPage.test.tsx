import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InventoryListPage } from '../InventoryListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock hooks and components used inside InventoryListPage
vi.mock('@modules/inventory', () => ({
  useStockMoves: () => ({ data: [], total: 0, loading: false, error: null }),
  StockMovesTable: () => <div>Tabla de movimientos</div>,
  InventoryFilters: () => <div>Filtros</div>,
}));
vi.mock('@core/mockApi', () => ({ logout: vi.fn() }));
vi.mock('@shared/utils/notify.util', () => ({ notify: vi.fn() }));

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('InventoryListPage', () => {
  it('muestra el título y los componentes principales', () => {
    renderWithClient(<InventoryListPage />);
    expect(screen.getByText('Listado de Movimientos de Inventario')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Tabla de movimientos')).toBeInTheDocument();
  });
});
