import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@shared/components/PrivateRoute';
import { InventoryListPage, InventoryDetailPage } from '@modules/inventory';

export const InventoryRouter = () => (
	<Routes>
		<Route path="" element={<PrivateRoute><InventoryListPage /></PrivateRoute>} />
		<Route path=":id" element={<PrivateRoute><InventoryDetailPage /></PrivateRoute>} />
	</Routes>
);

