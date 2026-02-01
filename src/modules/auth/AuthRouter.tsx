import { LoginPage } from '@modules/auth';
import { Routes, Route } from 'react-router-dom';

export const AuthRouter = () => (
	<Routes>
		<Route path="" element={<LoginPage />} />
	</Routes>
);

