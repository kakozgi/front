// AlumnoParticipante.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const AlumnoParticipante = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const cargarAlumnos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/alumnosParticipantes');
            const alumnos = response.data;

            // Obtener detalles de carreras y asignaturas
            const carrerasResponse = await axios.get('http://localhost:3001/carrera');
            const asignaturasResponse = await axios.get('http://localhost:3001/asignaturasParticipantes');
            const carreras = carrerasResponse.data;
            const asignaturas = asignaturasResponse.data;

            const alumnosConDetalles = alumnos.map(alumno => {
                const carrera = carreras.find(c => c.id === alumno.id_carrera);
                const asignatura = asignaturas.find(a => a.id === alumno.id_asignaturaParticipante);
                return {
                    ...alumno,
                    carrera: carrera ? carrera.name_careers : 'Carrera no encontrada',
                    asignatura: asignatura ? asignatura.name_asignature : 'Asignatura no encontrada',
                };
            });

            setAlumnos(alumnosConDetalles);
        } catch (error) {
            console.error('Error al cargar alumnos participantes:', error.message);
            setError('Error al cargar alumnos participantes. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarAlumno = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este alumno participante?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/alumnosParticipantes/${id}`);
                setAlumnos(alumnos.filter(alumno => alumno.id !== id));
                console.log('Alumno participante eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar el alumno participante:', error.message);
                setError('Error al eliminar el alumno participante. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <h2 className="text-center">Lista de Alumnos Participantes</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="text-end mb-3">
                    <Link to="/alumnosParticipantes/crear" className="btn btn-success">Nuevo Alumno Participante</Link>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Asignatura Participante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map(alumno => (
                            <tr key={alumno.id}>
                                <td>{alumno.name_alumno}</td>
                                <td>{alumno.carrera}</td>
                                <td>{alumno.asignatura}</td>
                                <td>
                                    <Link to={`/alumnoparticipante/edit/${alumno.id}`} className="btn btn-primary btn-sm ms-2">Editar</Link>
                                    <button onClick={() => handleEliminarAlumno(alumno.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlumnoParticipante;
