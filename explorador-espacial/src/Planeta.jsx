// src/Planeta.jsx
import React, { useEffect } from 'react';
import './Planeta.css'; // Para estilos del planeta

function Planeta({ nombre }) {
    // --- FASE DE MONTAJE Y DESMONTAJE (useEffect con array de dependencias vacío) ---
    useEffect(() => {
        // Montaje: Se ejecuta cuando el componente Planeta aparece en la pantalla.
        console.log(`✨ [MONTAJE - Planeta]: ¡El planeta ${nombre} ha aparecido!`);

        // Desmontaje: Se ejecuta cuando el componente Planeta es removido de la pantalla.
        return () => {
            console.log(`🌑 [DESMONTAJE - Planeta]: ¡El planeta ${nombre} ha desaparecido!`);
        };
    }, []); // El array vacío asegura que se ejecuta solo al montar y la limpieza al desmontar.

    return (
        <div className="planeta-card">
            <p>{nombre}</p>
        </div>
    );
}

export default Planeta;