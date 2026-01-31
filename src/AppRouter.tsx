import LoginPage from './modules/auth/pages/LoginPage';
import { PrivateRoute } from './shared/components/PrivateRoute';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { InventoryListPage } from './modules/inventory/pages/InventoryListPage';
import { InventoryDetailPage } from './modules/inventory/pages/InventoryDetailPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={
          <PrivateRoute>
            <InventoryListPage />
          </PrivateRoute>
        } />
        <Route path="/inventory/:id" element={
          <PrivateRoute>
            <InventoryDetailPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
