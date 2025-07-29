// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta.jsx'; // Importa el componente Planeta
import './App.css'; // Para estilos básicos del panel

function App() {
  //Estado 
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [simulacionActiva, setSimulacionActiva] = useState(true); 

  //MONTAJE Y DESMONTAJE
  useEffect(() => {
    // Montaje
    console.log("¡El panel de control está listo!");

    // Simula el vuelo: Cada segundo, reduce combustible y aumenta distancia.
   const intervalo = setInterval(() => {
      setDistancia(prevDist => prevDist + 100); // Aumenta distancia
      setCombustible(prevComb => Math.max(0, prevComb - 1)); // Reduce combustible, mínimo 0
    }, 1000); // Cada 1 segundo

    // Desmontaje: La función de retorno se ejecuta cuando el componente se desmonta.
    return () => {
      clearInterval(intervalo); // Limpia el intervalo de vuelo para evitar fugas de memoria
      console.log("El panel de control se ha apagado.");
    };
  }, []);

  //ACTUALIZACIÓN
  useEffect(() => {
    console.log(`¡Combustible actualizado a ${combustible}%!`);

    if (combustible === 0 && estadoNave !== 'Sin Combustible') {
      setEstadoNave('Sin Combustible');
      console.warn('⚠️ ¡ALERTA! Combustible agotado. Se requiere reabastecimiento.');
      clearInterval(intervalId); // Detenemos el vuelo si no hay combustible
    } else if (combustible > 0 && estadoNave === 'Sin Combustible') {
      setEstadoNave('En órbita'); // Si se recarga, volvemos a órbita
    }
  }, [combustible, estadoNave]); // Depende de combustible y estadoNave para reaccionar a cambios

  //CÁLCULO OPTIMIZADO CON useMemo
  const mensajeEstado = useMemo(() => {
    console.log("Calculando mensaje de estado de la nave...");
    switch (estadoNave) {
      case 'En órbita':
        return "Nave operando con normalidad.";
      case 'Aterrizando':
        return "Preparándose para el aterrizaje.";
      case 'Sin Combustible':
        return "¡Combustible crítico! Necesita reabastecimiento.";
      default:
        return "Estado desconocido.";
    }
  }, [estadoNave]); // Se recalcula solo cuando 'estadoNave' cambia

  // Función para simular el aterrizaje y añadir un planeta visitado
  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    const nuevoPlaneta = `Planeta Alfa-${planetasVisitados.length + 1}`;
    setPlanetasVisitados(prevPlanetas => [...prevPlanetas, nuevoPlaneta]);
    console.log(`Aterrizando en ${nuevoPlaneta}.`);
    // Podríamos detener el intervalo aquí si el aterrizaje fuera permanente
  };

  // Función para recargar combustible
  const recargarCombustible = () => {
    setCombustible(100);
    setEstadoNave('En órbita');
    console.log('⛽ [ACCIÓN]: Combustible recargado al 100%.');
  };

  // Renderizado condicional para demostrar el desmontaje del Panel
  if (!simulacionActiva) {
    return (
      <div className="app-container">
        <h1>Panel Desactivado</h1>
        <p>El panel de control está apagado. Puedes volver a encenderlo.</p>
        <button onClick={() => setSimulacionActiva(true)} className="btn-toggle">
          Encender Panel
        </button>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <h1>Panel de Control de la Nave</h1>

      <div className="info-section">
        <p><strong>Distancia Recorrida:</strong> {distancia} km</p>
        <p><strong>Combustible Restante:</strong> <span className={combustible < 20 ? 'alerta' : ''}>{combustible}%</span></p>
        <p><strong>Estado de la Nave:</strong> {mensajeEstado}</p>
      </div>

      <div className="actions-section">
        <button onClick={aterrizar} className="btn-accion">
          Aterrizar y Registrar Planeta
        </button>
        <button onClick={recargarCombustible} className="btn-accion">
          Recargar Combustible
        </button>
        <button onClick={() => setSimulacionActiva(false)} className="btn-toggle">
          Apagar Panel
        </button>
      </div>

      <h2>Planetas Visitados</h2>
      {planetasVisitados.length === 0 ? (
        <p>Aún no has visitado ningún planeta. ¡A explorar!</p>
      ) : (
        <div className="planetas-grid">
          {planetasVisitados.map((planetaNombre, index) => (
            <Planeta key={index} nombre={planetaNombre} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
