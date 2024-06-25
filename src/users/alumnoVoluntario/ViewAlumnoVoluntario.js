import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom';

const ViewAlumnosVoluntarios = () => {
    const [alumnosVoluntarios, setAlumnosVoluntarios] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnosVoluntarios();
        cargarProyectos();
    }, []);

    const cargarAlumnosVoluntarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/listadoAlumnosVoluntarios');
            setAlumnosVoluntarios(response.data);
        } catch (error) {
            console.error('Error al cargar alumnos voluntarios:', error.message);
            setError('Error al cargar alumnos voluntarios. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            // Crear un objeto de proyectos con id como clave para facilitar el acceso
            const proyectosData = {};
            response.data.forEach(proyecto => {
                proyectosData[proyecto.id] = proyecto.name_proyect;
            });
            setProyectos(proyectosData);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarAlumnoVoluntario = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este alumno voluntario?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/listadoAlumnosVoluntarios/${id}`);
                setAlumnosVoluntarios(alumnosVoluntarios.filter(alumno => alumno.id !== id));
            } catch (error) {
                setError('Error al eliminar el alumno voluntario');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Alumnos Voluntarios</h2>
                        <div className="text-end mb-3">
                            <Link to="/alumnovoluntario" className="btn btn-success">Nuevo Alumno Voluntario</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>RUT</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnosVoluntarios.map(alumno => (
                                    <tr key={alumno.id}>
                                        <td>{alumno.name}</td>
                                        <td>{alumno.rut}</td>
                                        <td>{proyectos[alumno.id_proyect] || 'Nombre del Proyecto No Disponible'}</td>
                                        <td>
                                            <Link to={`/alumnovoluntario/edit/${alumno.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarAlumnoVoluntario(alumno.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAlumnosVoluntarios;
