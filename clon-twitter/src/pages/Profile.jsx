import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
    return (
        <div className="page-container">
            <h1>Perfil de Usuario</h1>
            {user ? (
                <div className="profile-details">
                    <p><strong>Nombre de usuario:</strong> {user.username}</p>
                    <p><strong>Estado:</strong> Autenticado</p>
                    <p>Esta es tu página de perfil personal. Aquí podrías ver tus tweets, seguidores, etc.</p>
                    <Link to="/" className="btn secondary-btn">Volver a Inicio</Link>
                </div>
            ) : (
                <div className="error-message">
                    <p>No se pudo cargar el perfil. Por favor, inicia sesión.</p>
                    <Link to="/login" className="btn primary-btn">Ir a Iniciar Sesión</Link>
                </div>
            )}
        </div>
    );
};

export default Profile;