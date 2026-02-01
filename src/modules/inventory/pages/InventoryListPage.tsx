import { logout } from '@core/mockApi';
import { useState, useEffect } from 'react';
import { notify } from '@shared/utils/notify.util';
import { STOCK_MOVE } from '@shared/constants/stockMoveTypes';
import { useStockMoves, StockMovesTable, InventoryFilters } from '@modules/inventory';

export const InventoryListPage = () => {

	const [type, setType] = useState('');
	const [product, setProduct] = useState('');
	const [warehouse, setWarehouse] = useState('');
	const [page, setPage] = useState(1);
	const pageSize = 10;

	const { data, total, loading, error } = useStockMoves({
		product: product || undefined,
		warehouse: warehouse || undefined,
		type: type ? (type as STOCK_MOVE) : undefined,
		page,
		pageSize,
	});

	const totalPages = Math.ceil(total / pageSize);

	const handlePrev = () => setPage((p) => Math.max(1, p - 1));
	const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

	const handleProduct = (v: string) => {
		setProduct(v);
		setPage(1);
	};
	const handleWarehouse = (v: string) => {
		setWarehouse(v);
		setPage(1);
	};
	const handleType = (v: string) => {
		setType(v);
		setPage(1);
	};

	useEffect(() => {
		if (error) notify(error, 'error');
	}, [error]);

	if (loading) return <div>Cargando movimientos...</div>;

	return (
		<div style={{ padding: 24 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Listado de Movimientos de Inventario</h2>
				
				<button
					onClick={logout}
					style={{ padding: '8px 16px' }}
				>
					Cerrar sesión
				</button>
			</div>

			<InventoryFilters
				type={type}
				product={product}
				setType={handleType}
				warehouse={warehouse}
				setProduct={handleProduct}
				setWarehouse={handleWarehouse}
			/>

			<StockMovesTable data={data} />

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 16 }}>
				<button onClick={handlePrev} disabled={page === 1}>Anterior</button>
				<span>Página {page} de {totalPages || 1}</span>
				<button onClick={handleNext} disabled={page === totalPages || totalPages === 0}>Siguiente</button>
			</div>
		</div>
	);
}
