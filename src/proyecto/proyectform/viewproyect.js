import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom';

const ViewProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            setProyectos(response.data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarProyecto = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/proyecto/${id}`);
                setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
            } catch (error) {
                setError('Error al eliminar el proyecto');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Proyectos</h2>
                        <div className="text-end mb-3">
                            <Link to="/proyect" className="btn btn-success">Nuevo Proyecto</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre del Proyecto</th>
                                    <th>Descripción</th>
                            
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proyectos.map(proyecto => (
                                    <tr key={proyecto.id}>
                                        <td>{proyecto.name_proyect}</td>
                                        <td>{proyecto.description}</td>
            
                                        <td>
                                            <Link to={`/proyecto/detalle/${proyecto.id}`} className="btn btn-primary btn-sm me-2">Ver Detalles</Link>
                                            <Link to={`/proyect/edit/${proyecto.id}`} className="btn btn-info btn-sm me-2">Editar</Link>
                                            <button onClick={() => handleEliminarProyecto(proyecto.id)} className="btn btn-danger btn-sm">Eliminar</button>
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

export default ViewProyectos;
