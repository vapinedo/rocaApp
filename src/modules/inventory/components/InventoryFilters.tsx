import type { StockMoveType } from '../hooks/useStockMoves';
import { STOCK_MOVE_TYPES } from '../../../shared/constants/stockMoveTypes';

interface InventoryFiltersProps {
  type: string;
  product: string;
  warehouse: string;
  setType: (v: string) => void;
  setProduct: (v: string) => void;
  setWarehouse: (v: string) => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = (props) => {

  const { product, setProduct, warehouse, setWarehouse, type, setType } = props;

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
      <input
        type="text"
        value={product}
        placeholder="Producto"
        style={{ padding: 8, flex: 1 }}
        onChange={e => setProduct(e.target.value)}
      />

      <select
        value={warehouse}
        style={{ padding: 8, flex: 1 }}
        onChange={e => setWarehouse(e.target.value)}
      >
        <option value="">Todas las bodegas</option>
        <option value="Bodega Central">Bodega Central</option>
        <option value="Bodega Norte">Bodega Norte</option>
      </select>

      <select
        value={type}
        style={{ padding: 8, flex: 1 }}
        onChange={e => setType(e.target.value)}
      >
        <option value="">Todos los tipos</option>
        {STOCK_MOVE_TYPES.map((t: StockMoveType) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};
