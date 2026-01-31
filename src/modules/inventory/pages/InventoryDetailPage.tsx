import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStockMoveDetail } from '../hooks/useStockMoveDetail';
import { usePatchStockMoveReference } from '../hooks/usePatchStockMoveReference';

export const InventoryDetailPage = () => {

	const { id } = useParams();
	const navigate = useNavigate();
	const { data, loading, error } = useStockMoveDetail(id || '');
	const { patchReference, loading: saving, error: saveError, data: updated } = usePatchStockMoveReference();
	const [reference, setReference] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (data) setReference(data.reference);
	}, [data]);

	useEffect(() => {
		if (updated) {
			setSuccess(true);
			setTimeout(() => setSuccess(false), 2000);
		}
	}, [updated]);

	if (loading) return <div style={{ padding: 24 }}>Cargando detalle...</div>;
	if (error) return <div style={{ padding: 24, color: 'red' }}>Error: {error}</div>;
	if (!data) return null;

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (reference.length < 3 || reference.length > 60) return;
		patchReference(data.id, reference);
	};

	return (
		<div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>

			<h2>Detalle de Movimiento</h2>

			<div style={{ marginBottom: 16 }}><b>ID:</b> {data.id}</div>
			<div style={{ marginBottom: 16 }}><b>Fecha:</b> {data.date}</div>
			<div style={{ marginBottom: 16 }}><b>Producto:</b> {data.product}</div>
			<div style={{ marginBottom: 16 }}><b>Bodega:</b> {data.warehouse}</div>
			<div style={{ marginBottom: 16 }}><b>Tipo:</b> {data.type}</div>
			<div style={{ marginBottom: 16 }}><b>Cantidad:</b> {data.quantity}</div>

			<form onSubmit={handleSave} style={{ marginTop: 24 }}>
				<label><b>Referencia:</b></label>
				<input
					type="text"
					value={reference}
					onChange={e => setReference(e.target.value)}
					minLength={3}
					maxLength={60}
					style={{ width: '100%', padding: 8, marginTop: 4 }}
				/>

				<button type="submit" disabled={saving || reference.length < 3 || reference.length > 60} style={{ marginTop: 12 }}>
					{saving ? 'Guardando...' : 'Guardar referencia'}
				</button>

				{saveError && <div style={{ color: 'red', marginTop: 8 }}>{saveError}</div>}
				{success && <div style={{ color: 'green', marginTop: 8 }}>Referencia actualizada</div>}
			</form>

			<button onClick={() => navigate(-1)} style={{ marginTop: 24 }}>Volver</button>
		</div>
	);
}
