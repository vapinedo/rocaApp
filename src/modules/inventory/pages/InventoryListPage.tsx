
export const InventoryListPage = () => {
	return (
		<div style={{ padding: 24 }}>
			<h2>Listado de Movimientos de Inventario</h2>
						{loading && <div>Cargando movimientos...</div>}
						{error && <div style={{ color: 'red' }}>Error: {error}</div>}
						{!loading && !error && <StockMovesTable data={data} />}
		</div>
	);
}
import { useStockMoves } from '../hooks/useStockMoves';
import { StockMovesTable } from '../components/StockMovesTable';
	const { data, loading, error } = useStockMoves({});
