import { render, screen, fireEvent } from '@testing-library/react';
import { InventoryListPage } from '../InventoryListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mocks deben ir antes de los imports de los módulos a testear
const useStockMovesMock = vi.fn();
vi.mock('@modules/inventory', () => ({
  useStockMoves: (...args: any[]) => useStockMovesMock(...args),
  StockMovesTable: ({ data }: any) => <div>Tabla: {data.length}</div>,
  InventoryFilters: (props: any) => (
    <div>
      <button onClick={() => props.setProduct('test')}>SetProduct</button>
      <button onClick={() => props.setWarehouse('Bodega Central')}>SetWarehouse</button>
      <button onClick={() => props.setType('IN')}>SetType</button>
    </div>
  ),
}));
vi.mock('@core/mockApi', () => ({ logout: vi.fn() }));
vi.mock('@shared/utils/notify.util', () => ({ notify: vi.fn() }));

import { logout } from '@core/mockApi';
import { notify } from '@shared/utils/notify.util';

vi.mock('@core/mockApi', () => ({ logout: vi.fn() }));
vi.mock('@shared/utils/notify.util', () => ({ notify: vi.fn() }));

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('InventoryListPage - estados y handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra loading', () => {
    useStockMovesMock.mockReturnValue({ data: [], total: 0, loading: true, error: null });
    renderWithClient(<InventoryListPage />);
    expect(screen.getByText(/Cargando movimientos/)).toBeInTheDocument();
  });

  it('muestra error y dispara notificación', () => {
    useStockMovesMock.mockReturnValue({ data: [], total: 0, loading: false, error: 'Error de test' });
    renderWithClient(<InventoryListPage />);
    expect(notify).toHaveBeenCalledWith('Error de test', 'error');
  });

  it('muestra empty state', () => {
    useStockMovesMock.mockReturnValue({ data: [], total: 0, loading: false, error: null });
    renderWithClient(<InventoryListPage />);
    expect(screen.getByText('Tabla: 0')).toBeInTheDocument();
  });

  it('ejecuta logout al hacer click', () => {
    useStockMovesMock.mockReturnValue({ data: [], total: 0, loading: false, error: null });
    renderWithClient(<InventoryListPage />);
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(logout).toHaveBeenCalled();
  });

  it('handlers de filtros actualizan el estado', () => {
    useStockMovesMock.mockReturnValue({ data: [], total: 0, loading: false, error: null });
    renderWithClient(<InventoryListPage />);
    fireEvent.click(screen.getByText('SetProduct'));
    fireEvent.click(screen.getByText('SetWarehouse'));
    fireEvent.click(screen.getByText('SetType'));
  });
});
