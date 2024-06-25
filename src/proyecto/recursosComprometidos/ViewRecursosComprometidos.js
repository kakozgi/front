import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewRecursosComprometidos = () => {
    const [recursos, setRecursos] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [error, setError] = useState('');
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

    useEffect(() => {
        cargarRecursos();
        cargarProyectos();
    }, []);

    const cargarRecursos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/recursosComprometidos');
            setRecursos(response.data);
        } catch (error) {
            console.error('Error al cargar recursos comprometidos:', error.message);
            setError('Error al cargar recursos comprometidos. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            const proyectosMap = response.data.reduce((map, proyecto) => {
                map[proyecto.id] = proyecto.name_proyect;
                return map;
            }, {});
            setProyectos(proyectosMap);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarRecurso = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este recurso?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/recursosComprometidos/${id}`);
                setRecursos(recursos.filter(recurso => recurso.id !== id));
                console.log('Recurso eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar recurso:', error.message);
            }
        }
    };

    const handleProyectoSeleccionado = (e) => {
        setProyectoSeleccionado(e.target.value);
    };

    const recursosFiltrados = proyectoSeleccionado
        ? recursos.filter(recurso => recurso.id_proyecto === parseInt(proyectoSeleccionado))
        : recursos;

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Recursos Comprometidos</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={proyectoSeleccionado}
                                onChange={handleProyectoSeleccionado}
                            >
                                <option value="">Todos los Proyectos</option>
                                {Object.keys(proyectos).map(proyectoId => (
                                    <option key={proyectoId} value={proyectoId}>
                                        {proyectos[proyectoId]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-end mb-3">
                            <Link to="/recursoscomprometidos" className="btn btn-success">Nuevo Recurso</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Monto</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recursosFiltrados.map(recurso => (
                                    <tr key={recurso.id}>
                                        <td>{recurso.name_recurso}</td>
                                        <td>${recurso.monto}</td>
                                        <td>
                                            {proyectos[recurso.id_proyecto] ? (
                                                <Link to={`/proyecto/view/${recurso.id_proyecto}`}>
                                                    {proyectos[recurso.id_proyecto]}
                                                </Link>
                                            ) : (
                                                'Proyecto no encontrado'
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/recursoscomprometidos/edit/${recurso.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRecurso(recurso.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecursosComprometidos;
