import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { loading, error, token, handleLogin } = useLogin();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate('/inventory', { replace: true });
		}
	}, [token, navigate]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleLogin(username, password);
	};

	return (
		<div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<div style={{ marginBottom: 16 }}>
					<label>Usuario</label>
					<input
						required
						type="text"
						value={username}
						style={{ width: '100%', padding: 8 }}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Contraseña</label>
					<input
						required
						type="password"
						value={password}
						style={{ width: '100%', padding: 8 }}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
					{loading ? 'Ingresando...' : 'Ingresar'}
				</button>
				{error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
				{token && <div style={{ color: 'green', marginTop: 12 }}>Login exitoso</div>}
			</form>
		</div>
	);
}
