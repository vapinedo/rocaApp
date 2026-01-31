import type { StockMove } from '../../../core/mockApi';

interface StockMovesTableProps {
  data: StockMove[];
}

export const StockMovesTable = ({ data }: StockMovesTableProps) => {
  if (!data.length) return <div>No hay movimientos para mostrar.</div>;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Producto</th>
          <th>Bodega</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Referencia</th>
        </tr>
      </thead>
      <tbody>
        {data.map((move) => (
          <tr key={move.id}>
            <td>{move.date}</td>
            <td>{move.product}</td>
            <td>{move.warehouse}</td>
            <td>{move.type}</td>
            <td>{move.quantity}</td>
            <td>{move.reference}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
