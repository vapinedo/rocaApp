
import { useState } from 'react';
import { useStockMoves } from '../hooks/useStockMoves';
import { StockMovesTable } from '../components/StockMovesTable';

export const InventoryListPage = () => {
	const [type, setType] = useState('');
	const [product, setProduct] = useState('');
	const [warehouse, setWarehouse] = useState('');

	const { data, loading, error } = useStockMoves({
		product: product || undefined,
		warehouse: warehouse || undefined,
		type: type ? (type as 'IN' | 'OUT' | 'ADJUST') : undefined,
	});

	return (
		<div style={{ padding: 24 }}>
			<h2>Listado de Movimientos de Inventario</h2>

			<div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
				<input
					type="text"
					placeholder="Producto"
					value={product}
					onChange={e => setProduct(e.target.value)}
					style={{ padding: 8, flex: 1 }}
				/>

				<select
					value={warehouse}
					onChange={e => setWarehouse(e.target.value)}
					style={{ padding: 8, flex: 1 }}
				>
					<option value="">Todas las bodegas</option>
					<option value="Bodega Central">Bodega Central</option>
					<option value="Bodega Norte">Bodega Norte</option>
				</select>

				<select
					value={type}
					onChange={e => setType(e.target.value)}
					style={{ padding: 8, flex: 1 }}
				>
					<option value="">Todos los tipos</option>
					<option value="IN">IN</option>
					<option value="OUT">OUT</option>
					<option value="ADJUST">ADJUST</option>
				</select>
			</div>

			{loading && <div>Cargando movimientos...</div>}
			{error && <div style={{ color: 'red' }}>Error: {error}</div>}
			{!loading && !error && <StockMovesTable data={data} />}
		</div>
	);
}
