import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, logout }) => {
    return (
        <div className="page-container">
            <h1>Bienvenido a Twitter Clone</h1>
            {user ? (
                <div className="auth-info">
                    <p>¡Hola, **{user.username}**!</p>
                    <div className="auth-actions">
                        <Link to="/profile" className="btn secondary-btn">Ver Perfil</Link>
                        <button onClick={logout} className="btn danger-btn">Cerrar sesión</button>
                    </div>
                </div>
            ) : (
                <div className="auth-info">
                    <p>No has iniciado sesión.</p>
                    <Link to="/login" className="btn primary-btn">Iniciar sesión</Link>
                </div>
            )}
            <div className="content-section">
                <h2>Tu Línea de Tiempo</h2>
                <p>Aquí verías los últimos tweets de tus contactos. ¡Imagina que hay muchos tweets interesantes aquí!</p>
                <div className="tweet-placeholder">
                    <p>"¡Hola mundo desde mi Twitter Clone!"</p>
                    <small>- @usuario_ejemplo</small>
                </div>
                <div className="tweet-placeholder">
                    <p>"Aprendiendo autenticación con React Router. ¡Es genial!"</p>
                    <small>- @dev_react</small>
                </div>
            </div>
        </div>
    );
};

export default Home;