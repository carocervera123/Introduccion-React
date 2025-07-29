import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [mensajeEstado, setMensajeEstado] = useState(''); 

  useEffect(() => {
    document.title = `Total Tareas: ${tiempoTotal} minutos`;
    console.log("Título del documento actualizado.");
    setMensajeEstado(`Actualmente tienes ${tareas.length} tareas registradas.`);
  }, [tiempoTotal, tareas.length]); 


  const tiempoTotal = useMemo(() => {
    console.log("Recalculando tiempo total de tareas...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); 

  const agregarTarea = () => {
    const duracionNumerica = parseInt(duracion);

    if (nuevaTarea.trim() === '' || isNaN(duracionNumerica) || duracionNumerica <= 0) {
      alert("Por favor, ingresa un nombre válido y una duración positiva para la tarea.");
      return;
    }

    const nuevaTareaObj = {
      nombre: nuevaTarea.trim(),
      duracion: duracionNumerica
    };

    setTareas([...tareas, nuevaTareaObj]);
    setNuevaTarea('');
    setDuracion('');
    console.log(`Tarea agregada: "${nuevaTareaObj.nombre}" (${nuevaTareaObj.duracion} min)`);
  };

  return (
    <div className="container">
      <h1>Contador de Tareas</h1>

      {}
      <div className="form-section card">
        <h2>Añadir Nueva Tarea</h2>
        <div className="input-group">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nombre de la tarea"
            className="input-field"
          />
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            placeholder="Duración en minutos"
            className="input-field"
          />
          <button onClick={agregarTarea} className="btn add-btn">Agregar Tarea</button>
        </div>
      </div>

      <hr /> {}

      {}
      <div className="tasks-list-section card">
        <h2>Tareas Registradas</h2>
        {tareas.length === 0 ? (
          <p className="empty-message">No hay tareas aún. ¡Comienza a añadir algunas!</p>
        ) : (
          <ul>
            {tareas.map((tarea, index) => (
              <li key={index} className="task-item">
                <span className="task-name">{tarea.nombre}:</span>
                <span className="task-duration">{tarea.duracion} minutos</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {}
      <div className="total-time-section card">
        <h3>Total de tiempo dedicado: <span className="total-duration">{tiempoTotal}</span> minutos</h3>
        <p className="status-message">{mensajeEstado}</p>
      </div>
    </div>
  );
}

export default App;
