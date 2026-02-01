import { AuthRouter } from '@modules/auth';
import { InventoryRouter } from '@modules/inventory';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/*" element={<AuthRouter />} />
        <Route path="/inventory/*" element={<InventoryRouter />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
