import { useState } from 'react';
import { useStockMoves } from '../hooks/useStockMoves';
import type { StockMoveType } from '../hooks/useStockMoves';
import { StockMovesTable } from '../components/StockMovesTable';
import { STOCK_MOVE_TYPES } from '../../../shared/constants/stockMoveTypes';

export const InventoryListPage = () => {

	const [type, setType] = useState('');
	const [product, setProduct] = useState('');
	const [warehouse, setWarehouse] = useState('');
	const [page, setPage] = useState(1);
	const pageSize = 10;

	const { data, total, loading, error } = useStockMoves({
		product: product || undefined,
		warehouse: warehouse || undefined,
		type: type ? (type as StockMoveType) : undefined,
		page,
		pageSize,
	});

	const totalPages = Math.ceil(total / pageSize);

	const handlePrev = () => setPage((p) => Math.max(1, p - 1));
	const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

	const handleFilterChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setter(e.target.value);
		setPage(1);
	};

	return (
		<div style={{ padding: 24 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Listado de Movimientos de Inventario</h2>
				<button
					onClick={() => {
						localStorage.removeItem('token');
						window.location.href = '/login';
					}}
					style={{ padding: '8px 16px' }}
				>
					Cerrar sesión
				</button>
			</div>

			<div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
				<input
					type="text"
					value={product}
					placeholder="Producto"
					style={{ padding: 8, flex: 1 }}
					onChange={handleFilterChange(setProduct)}
				/>

				<select
					value={warehouse}
					onChange={handleFilterChange(setWarehouse)}
					style={{ padding: 8, flex: 1 }}
				>
					<option value="">Todas las bodegas</option>
					<option value="Bodega Central">Bodega Central</option>
					<option value="Bodega Norte">Bodega Norte</option>
				</select>

				<select
					value={type}
					onChange={handleFilterChange(setType)}
					style={{ padding: 8, flex: 1 }}
				>
					<option value="">Todos los tipos</option>
											{STOCK_MOVE_TYPES.map((t: StockMoveType) => (
												<option key={t} value={t}>{t}</option>
											))}
				</select>
			</div>

			{loading && <div>Cargando movimientos...</div>}
			{error && <div style={{ color: 'red' }}>Error: {error}</div>}
			{!loading && !error && <StockMovesTable data={data} />}

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 16 }}>
				<button onClick={handlePrev} disabled={page === 1}>Anterior</button>
				<span>Página {page} de {totalPages || 1}</span>
				<button onClick={handleNext} disabled={page === totalPages || totalPages === 0}>Siguiente</button>
			</div>
		</div>
	);
}
