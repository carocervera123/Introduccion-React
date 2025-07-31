import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 

        
        if (username.trim() === '' || password.trim() === '') {
            setError('Ingresa nombre de usuario y contraseña.');
            return;
        }

        if (password === 'password123') {
            onLogin(username); 
            navigate('/'); 
        } else {
            setError('Credenciales incorrectas. Intenta de nuevo.');
        }
    };

    return (
        <div className="page-container login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Introduce tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message-inline">{error}</p>}
                <button type="submit" className="btn primary-btn">Iniciar sesión</button>
            </form>
            <p className="hint-text">Pista: Puedes usar cualquier nombre de usuario con la contraseña "password123".</p>
        </div>
    );
};

export default Login;