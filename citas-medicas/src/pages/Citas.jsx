import React from 'react';
import { Link } from 'react-router-dom';

const citasDeEjemplo = [
    { id: '1', paciente: 'Ana García', doctor: 'Dr. López', fecha: '2024-08-10', hora: '10:00 AM' },
    { id: '2', paciente: 'Juan Pérez', doctor: 'Dra. Martínez', fecha: '2024-08-10', hora: '11:30 AM' },
    { id: '3', paciente: 'María Fernández', doctor: 'Dr. López', fecha: '2024-08-11', hora: '09:00 AM' },
    { id: '4', paciente: 'Carlos Ruiz', doctor: 'Dra. Gómez', fecha: '2024-08-11', hora: '02:00 PM' },
];

function Citas() {
    return (
        <div className="page-container">
            <h2>Lista de Citas Médicas</h2>
            {citasDeEjemplo.length === 0 ? (
                <p>No hay citas programadas.</p>
            ) : (
                <ul className="citas-list">
                    {citasDeEjemplo.map(cita => (
                        <li key={cita.id} className="cita-item">
                            <Link to={`/cita/${cita.id}`} className="cita-link">
                                <p><strong>Paciente:</strong> {cita.paciente}</p>
                                <p><strong>Doctor:</strong> {cita.doctor}</p>
                                <p><strong>Fecha:</strong> {cita.fecha} - <strong>Hora:</strong> {cita.hora}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Citas;