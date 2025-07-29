import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css'; 

function App() {
  //Estado del Panel de Control de la Nave
  const [distanciaRecorrida, setDistanciaRecorrida] = useState(0);
  const [combustibleRestante, setCombustibleRestante] = useState(100);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [simulacionActiva, setSimulacionActiva] = useState(true); // Para activar/desactivar la simulación de vuelo

  //Estado de la Bitácora de Exploración
  const [planetasBitacora, setPlanetasBitacora] = useState([]);
  const [nombrePlaneta, setNombrePlaneta] = useState('');
  const [descripcionPlaneta, setDescripcionPlaneta] = useState('');
  const [imagenPlaneta, setImagenPlaneta] = useState(''); 
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null); 
  const [modoEdicionBitacora, setModoEdicionBitacora] = useState(false); 
  const fileInputRef = useRef(null); 

  const flightIntervalRef = useRef(null);

  //EFECTOS DEL CICLO DE VIDA

  //Montaje y Desmontaje del Panel de Control
  useEffect(() => {
    console.log('Panel de control inicializado');
    if (simulacionActiva) {
      flightIntervalRef.current = setInterval(() => {
        setDistanciaRecorrida(prevDist => prevDist + 100); 
        setCombustibleRestante(prevComb => Math.max(0, prevComb - 1)); 
      }, 1000); 
    }

    // Limpieza al desmontar el componente o al desactivar la simulación
    return () => {
      console.log('Panel de control apagado.');
      if (flightIntervalRef.current) {
        clearInterval(flightIntervalRef.current);
      }
    };
  }, [simulacionActiva]); 

  //Actualización del Estado de la Nave
  useEffect(() => {
    if (combustibleRestante <= 0 && estadoNave !== 'Sin Combustible') {
      setEstadoNave('Sin Combustible');
      console.warn('Combustible agotado.');
      if (flightIntervalRef.current) {
        clearInterval(flightIntervalRef.current); 
      }
    } else if (combustibleRestante > 0 && estadoNave === 'Sin Combustible') {
      setEstadoNave('En órbita'); 
      console.log('✅ [NAVE]: Combustible restablecido a nivel seguro.');
    } else if (combustibleRestante > 0 && estadoNave === 'Aterrizando') {
    } else if (combustibleRestante > 0 && estadoNave !== 'En órbita') {
      setEstadoNave('En órbita'); 
    }
    console.log(`Combustible actualizado a ${combustibleRestante}%.`);
  }, [combustibleRestante, estadoNave]); 

  // Cargar datos de la Bitácora desde localStorage al montar
  useEffect(() => {
    console.log("Cargando bitácora de exploración...");
    const datosGuardados = localStorage.getItem('bitacoraPlanetas');
    if (datosGuardados) {
      setPlanetasBitacora(JSON.parse(datosGuardados));
    }
  }, []); 

  // Guardar datos de la Bitácora en localStorage cada vez que los planetas cambian
  useEffect(() => {
    if (planetasBitacora.length > 0 || localStorage.getItem('bitacoraPlanetas') !== null) {
      console.log("Guardando cambios en el registro...");
      localStorage.setItem('bitacoraPlanetas', JSON.stringify(planetasBitacora));
    }
  }, [planetasBitacora]); 

  // Actualizar el título del documento basado en el número de planetas
  useEffect(() => {
    document.title = `Nave Apollo X | Planetas: ${planetasBitacora.length}`;
    console.log(`Título del documento actualizado.`);
  }, [planetasBitacora]); 

  // Mensaje de estado de la nave
  const mensajeEstadoNave = useMemo(() => {
    console.log("Calculando mensaje de estado de la nave...");
    switch (estadoNave) {
      case 'En órbita':
        return "Nave operando con normalidad.";
      case 'Aterrizando':
        return "Preparándose para el aterrizaje.";
      case 'Sin Combustible':
        return "¡COMBUSTIBLE CRÍTICO! Requiere reabastecimiento.";
      default:
        return "Estado desconocido.";
    }
  }, [estadoNave]); 

  //Resumen de la Bitácora
  const mensajeResumenBitacora = useMemo(() => {
    console.log("Calculando mensaje de resumen de la bitácora...");
    if (planetasBitacora.length === 0) {
      return "¡Comienza tu exploración registrando tu primer planeta!";
    } else if (planetasBitacora.length === 1) {
      return `Tienes 1 planeta registrado: ${planetasBitacora[0].nombre}.`;
    } else {
      return `¡Has visitado ${planetasBitacora.length} planetas! El último fue ${planetasBitacora[planetasBitacora.length - 1].nombre}.`;
    }
  }, [planetasBitacora]); 


  const aterrizarNave = () => {
    setEstadoNave('Aterrizando');
    console.log('📍 [NAVE]: Iniciando secuencia de aterrizaje.');
    if (flightIntervalRef.current) {
      clearInterval(flightIntervalRef.current); 
    }
  };

  const recargarCombustible = () => {
    setCombustibleRestante(100);
    setEstadoNave('En órbita'); 
    if (!simulacionActiva) { 
      setSimulacionActiva(true);
    }
    console.log('Combustible recargado al 100%.');
  };

  const toggleSimulacion = () => {
    setSimulacionActiva(prev => !prev);
    console.log(`Simulación de vuelo ${simulacionActiva ? 'detenida' : 'reanudad'}.`);
  };



  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPlaneta(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagenPlaneta('');
    }
  };

  const handleSubmitBitacora = (e) => {
    e.preventDefault();
    if (!nombrePlaneta.trim() || !descripcionPlaneta.trim()) {
      alert('El nombre y la descripción del planeta son obligatorios.');
      return;
    }

    if (modoEdicionBitacora && planetaSeleccionado) {
      const planetasActualizados = planetasBitacora.map(p =>
        p.id === planetaSeleccionado.id
          ? { ...p, nombre: nombrePlaneta, descripcion: descripcionPlaneta, imagen: imagenPlaneta }
          : p
      );
      setPlanetasBitacora(planetasActualizados);
      console.log(`Planeta '${nombrePlaneta}' actualizado.`);
    } else {
      const nuevoPlaneta = {
        id: Date.now(),
        nombre: nombrePlaneta.trim(),
        descripcion: descripcionPlaneta.trim(),
        imagen: imagenPlaneta,
        fechaRegistro: new Date().toLocaleDateString(),
      };
      setPlanetasBitacora([...planetasBitacora, nuevoPlaneta]);
      console.log(`Nuevo planeta '${nombrePlaneta}' registrado.`);
    }

    limpiarFormularioBitacora();
  };

  const limpiarFormularioBitacora = () => {
    setNombrePlaneta('');
    setDescripcionPlaneta('');
    setImagenPlaneta('');
    setPlanetaSeleccionado(null);
    setModoEdicionBitacora(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const verDetallesOEditarPlaneta = (planeta, esEdicion = false) => {
    setPlanetaSeleccionado(planeta);
    if (esEdicion) {
      setNombrePlaneta(planeta.nombre);
      setDescripcionPlaneta(planeta.descripcion);
      setImagenPlaneta(planeta.imagen);
      setModoEdicionBitacora(true);
    } else {
      setModoEdicionBitacora(false);
    }
  };

  const eliminarPlaneta = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este planeta del registro?')) {
      const planetasRestantes = planetasBitacora.filter(p => p.id !== id);
      setPlanetasBitacora(planetasRestantes);
      if (planetaSeleccionado && planetaSeleccionado.id === id) {
        setPlanetaSeleccionado(null);
        limpiarFormularioBitacora();
      }
      console.log(`Planeta con ID ${id} eliminado.`);
    }
  };

  return (
    <div className="main-container">

      <div className="panel-section card">
        <h1>Panel de Control de la Nave</h1>
        <div className="info-grid">
          <div className="info-card">
            <h3>Distancia Recorrida:</h3>
            <p>{distanciaRecorrida} km</p>
          </div>
          <div className="info-card">
            <h3>Combustible Restante:</h3>
            <p className={combustibleRestante < 20 ? 'alerta' : ''}>
              {combustibleRestante}%
            </p>
          </div>
          <div className="info-card">
            <h3>Estado de la Nave:</h3>
            <p className={estadoNave.includes('Sin Combustible') ? 'alerta' : ''}>
              {mensajeEstadoNave}
            </p>
          </div>
        </div>
        <div className="actions-section">
          <button onClick={aterrizarNave} className="btn primary">
            Aterrizar Nave
          </button>
          <button onClick={recargarCombustible} className="btn secondary">
            Recargar Combustible
          </button>
          <button onClick={toggleSimulacion} className="btn toggle">
            {simulacionActiva ? 'Detener Simulación' : 'Reanudar Simulación'}
          </button>
        </div>
      </div>

      <hr />

      {}
      <div className="bitacora-section">
        <h1>Bitácora de Exploración </h1>
        <p className="resumen-bitacora">{mensajeResumenBitacora}</p>

        {}
        <div className="form-section card">
          <h2>{modoEdicionBitacora ? 'Editar Registro de Planeta' : 'Registrar Nuevo Planeta'}</h2>
          <form onSubmit={handleSubmitBitacora}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Planeta:</label>
              <input
                type="text"
                id="nombre"
                value={nombrePlaneta}
                onChange={(e) => setNombrePlaneta(e.target.value)}
                placeholder="Ej. Kepler-186f"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción Detallada:</label>
              <textarea
                id="descripcion"
                value={descripcionPlaneta}
                onChange={(e) => setDescripcionPlaneta(e.target.value)}
                placeholder="Características, atmósfera, vida potencial..."
                rows="4"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="imagen">Adjuntar Imagen (opcional):</label>
              <input
                type="file"
                id="imagen"
                accept="image/*"
                onChange={handleImagenChange}
                ref={fileInputRef}
              />
              {imagenPlaneta && (
                <img src={imagenPlaneta} alt="Vista previa del planeta" className="imagen-preview" />
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary">
                {modoEdicionBitacora ? 'Guardar Cambios' : 'Registrar Planeta'}
              </button>
              {modoEdicionBitacora && (
                <button type="button" onClick={limpiarFormularioBitacora} className="btn secondary">
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </div>

        <hr />

        {}
        <div className="lista-section card">
          <h2>Planetas Registrados ({planetasBitacora.length})</h2>
          {planetasBitacora.length === 0 ? (
            <p className="mensaje-vacio">Aún no hay planetas en la bitácora.</p>
          ) : (
            <div className="planetas-grid">
              {planetasBitacora.map(planeta => (
                <div key={planeta.id} className="planeta-item" onClick={() => verDetallesOEditarPlaneta(planeta)}>
                  <h3>{planeta.nombre}</h3>
                  {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} className="planeta-thumbnail" />}
                  <p className="fecha-registro">Registrado: {planeta.fechaRegistro}</p>
                  <div className="item-actions">
                    <button onClick={(e) => { e.stopPropagation(); verDetallesOEditarPlaneta(planeta, true); }} className="btn edit">
                      Editar
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); eliminarPlaneta(planeta.id); }} className="btn delete">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {}
        {planetaSeleccionado && !modoEdicionBitacora && (
          <div className="detalles-section card">
            <h2>Detalles de: {planetaSeleccionado.nombre}</h2>
            {planetaSeleccionado.imagen && (
              <img src={planetaSeleccionado.imagen} alt={planetaSeleccionado.nombre} className="detalles-imagen" />
            )}
            <p><strong>Descripción:</strong></p>
            <p>{planetaSeleccionado.descripcion}</p>
            <p className="fecha-registro">Registrado el: {planetaSeleccionado.fechaRegistro}</p>
            <div className="detalles-actions">
              <button onClick={() => verDetallesOEditarPlaneta(planetaSeleccionado, true)} className="btn edit">
                Editar este Planeta
              </button>
              <button onClick={() => setPlanetaSeleccionado(null)} className="btn secondary">
                Cerrar Detalles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;