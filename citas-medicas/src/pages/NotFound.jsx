import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="page-container error-message">
            <h2>404 - Página No Encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className="btn primary">Volver al Inicio</Link>
        </div>
    );
}

export default NotFound;