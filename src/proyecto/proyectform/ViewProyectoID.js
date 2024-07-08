import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link, useParams} from 'react-router-dom';

const DetalleProyecto = () => {
    const { id } = useParams(); // Obtener el ID del proyecto de los parámetros de la URL

    const [proyecto, setProyecto] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProyecto();
    }, []);

    const cargarProyecto = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/proyecto/${id}`);
            setProyecto(response.data);
        } catch (error) {
            console.error('Error al cargar el proyecto:', error.message);
            setError('Error al cargar el proyecto. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarProyecto = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/proyecto/${id}`);
                window.location('/proyectos/view'); // Redireccionar a la lista de proyectos después de eliminar
            } catch (error) {
                setError('Error al eliminar el proyecto');
            }
        }
    };

    if (!proyecto) {
        return (
            <div>
                <Inicio />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h2 className="text-center">Detalles del Proyecto</h2>
                            <p>Cargando proyecto...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Detalles del Proyecto</h2>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{proyecto.name_proyect}</h5>
                                <p className="card-text"><strong>Versión:</strong> {proyecto.versionProyect}</p>
                                <p className="card-text"><strong>Descripción:</strong> {proyecto.description}</p>
                                <p className="card-text"><strong>Recomendaciones:</strong> {proyecto.recomendaciones}</p>
                                <p className="card-text"><strong>Restricciones:</strong> {proyecto.restriccciones}</p>
                                <p className="card-text"><strong>Total de Dinero Aprobado:</strong> {proyecto.totalDineroAprobacion}</p>
                                <p className="card-text"><strong>Recursos Gastados:</strong> {proyecto.recursosGastados}</p>
                                <p className="card-text"><strong>Fecha de Ejecución:</strong> {proyecto.fechaejecucion}</p>
                                <p className="card-text"><strong>Fecha de Inicio:</strong> {proyecto.startDate}</p>
                                <p className="card-text"><strong>Fecha de Actualización:</strong> {proyecto.updateDate}</p>
                                <p className="card-text"><strong>Fecha Final:</strong> {proyecto.finalDate}</p>
                                <p className="card-text"><strong>Descripción:</strong> {proyecto.descripcion}</p>
                                <Link to={`/proyect/edit/${proyecto.id}`} className="btn btn-primary me-2">Editar</Link>
                                <button onClick={handleEliminarProyecto} className="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
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

export default DetalleProyecto;
