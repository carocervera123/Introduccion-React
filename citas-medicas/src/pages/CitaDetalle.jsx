import React from 'react';
import { useParams, Link } from 'react-router-dom';

const citasDeEjemplo = [
    { id: '1', paciente: 'Ana García', doctor: 'Dr. López', fecha: '2024-08-10', hora: '10:00 AM', notas: 'Revisión anual.' },
    { id: '2', paciente: 'Juan Pérez', doctor: 'Dra. Martínez', fecha: '2024-08-10', hora: '11:30 AM', notas: 'Consulta por dolor de cabeza.' },
    { id: '3', paciente: 'María Fernández', doctor: 'Dr. López', fecha: '2024-08-11', hora: '09:00 AM', notas: 'Seguimiento de tratamiento.' },
    { id: '4', paciente: 'Carlos Ruiz', doctor: 'Dra. Gómez', fecha: '2024-08-11', hora: '02:00 PM', notas: 'Nueva consulta por alergias.' },
];

function CitaDetalle() {
    const { id } = useParams(); 

    const cita = citasDeEjemplo.find(c => c.id === id);

    if (!cita) {
        return (
            <div className="page-container error-message">
                <h2>Cita No Encontrada</h2>
                <p>Lo sentimos, no pudimos encontrar una cita con el ID: {id}.</p>
                <Link to="/citas" className="btn primary">Volver a la lista de citas</Link>
            </div>
        );
    }

    return (
        <div className="page-container cita-detalle-card">
            <h2>Detalles de la Cita</h2>
            <p><strong>ID de la cita:</strong> {cita.id}</p>
            <p><strong>Paciente:</strong> {cita.paciente}</p>
            <p><strong>Doctor:</strong> {cita.doctor}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            {cita.notas && <p><strong>Notas:</strong> {cita.notas}</p>}
            <Link to="/citas" className="btn primary">Volver a la lista de citas</Link>
        </div>
    );
}

export default CitaDetalle;