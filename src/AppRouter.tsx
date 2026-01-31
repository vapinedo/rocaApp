import { AuthRouter } from './modules/auth/AuthRouter';
import { InventoryRouter } from './modules/inventory/InventoryRouter';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthRouter />} />
        <Route path="/*" element={<InventoryRouter />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
