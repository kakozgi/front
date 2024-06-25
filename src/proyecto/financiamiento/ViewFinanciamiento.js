import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewFinanciamientoFuente = () => {
    const [fuentes, setFuentes] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        cargarFuentes();
        cargarProyectos();
    }, []);

    const cargarFuentes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/fuenteFinanciamiento');
            setFuentes(response.data);
        } catch (error) {
            console.error('Error al cargar fuentes de financiamiento:', error.message);
            setError('Error al cargar fuentes de financiamiento. Inténtalo de nuevo más tarde.');
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

    const handleEliminarFuente = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta fuente de financiamiento?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/fuenteFinanciamiento/${id}`);
                setFuentes(fuentes.filter(fuente => fuente.rut !== id));
                console.log('Fuente de financiamiento eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar fuente de financiamiento:', error.message);
                setError('Error al eliminar fuente de financiamiento. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Fuentes de Financiamiento</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                        <Link to="/fuentefinanciamiento" className="btn btn-success">Nueva Fuente de Financiamiento</Link>
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
                                {fuentes.map(fuente => (
                                    <tr key={fuente.rut}>
                                        <td>{fuente.name_financiamiento_fuente}</td>
                                        <td>${fuente.monto}</td>
                                        <td>
                                            {proyectos[fuente.id_proyecto] ? (
                                                <Link to={`/proyecto/view/${fuente.id_proyecto}`}>
                                                    {proyectos[fuente.id_proyecto]}
                                                </Link>
                                            ) : (
                                                'Proyecto no encontrado'
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/fuenteFinanciamiento/edit/${fuente.rut}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarFuente(fuente.rut)}>Eliminar</button>
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

export default ViewFinanciamientoFuente;
