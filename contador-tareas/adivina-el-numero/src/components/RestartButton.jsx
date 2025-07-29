import React from 'react';

const RestartButton = ({ onClick, show }) => {
    if (!show) return null; 

    return (
        <button onClick={onClick} className="btn secondary restart-btn">
            Jugar de Nuevo
        </button>
    );
};

export default RestartButton;