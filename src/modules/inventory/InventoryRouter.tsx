import { Routes, Route } from 'react-router-dom';
import { InventoryListPage } from './pages/InventoryListPage';
import { InventoryDetailPage } from './pages/InventoryDetailPage';
import { PrivateRoute } from '../../shared/components/PrivateRoute';

export const InventoryRouter = () => (
	<Routes>
		<Route path="" element={<PrivateRoute><InventoryListPage /></PrivateRoute>} />
		<Route path=":id" element={<PrivateRoute><InventoryDetailPage /></PrivateRoute>} />
	</Routes>
);

