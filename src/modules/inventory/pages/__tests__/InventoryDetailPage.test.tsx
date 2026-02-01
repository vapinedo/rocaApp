import { render, screen } from '@testing-library/react';
import { InventoryDetailPage } from '../InventoryDetailPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';

// Mock hooks and components used inside InventoryDetailPage
vi.mock('@modules/inventory', () => ({
  useStockMoveDetail: () => ({ data: { id: '1', date: '2026-01-01', product: 'iPad', warehouse: 'Bodega Central', type: 'IN', quantity: 10, reference: 'Ref' }, loading: false, error: null }),
  usePatchStockMoveReference: () => ({ patchReference: vi.fn(), loading: false, error: null, data: null }),
}));
vi.mock('@shared/utils/notify.util', () => ({ notify: vi.fn() }));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useParams: () => ({ id: '1' }), useNavigate: () => vi.fn() };
});

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('InventoryDetailPage', () => {
  it('muestra los datos del movimiento', () => {
    renderWithClient(<InventoryDetailPage />);
    expect(screen.getByText('Detalle de Movimiento')).toBeInTheDocument();
    expect(screen.getByText('iPad')).toBeInTheDocument();
    expect(screen.getByText('Bodega Central')).toBeInTheDocument();
    expect(screen.getByText('IN')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ref')).toBeInTheDocument();
  });
});
