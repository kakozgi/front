import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance'; // Asegúrate de que la instancia de Axios esté configurada
import { Link } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const ViewRestriccionesAprobacion = () => {
    const [restricciones, setRestricciones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRestricciones();
    }, []);

    const cargarRestricciones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/restriccionAprobacion'); // Cambia la URL según tu backend
            setRestricciones(response.data);
        } catch (error) {
            console.error('Error al cargar restricciones de aprobación:', error.message);
            setError('Error al cargar restricciones de aprobación. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarRestriccion = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta restricción?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/restriccionAprobacion/${id}`);
                setRestricciones(restricciones.filter(restriccion => restriccion.id !== id));
                console.log('Restricción eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar restricción:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Restricciones de Aprobación</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                            <Link to="/restriccionAprobacion" className="btn btn-success">Nueva Restricción</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restricciones.map(restriccion => (
                                    <tr key={restriccion.id}>
                                        <td>{restriccion.nameRestriccion}</td>
                                        <td>{restriccion.descripcion}</td>
                                        <td>
                                            <Link to={`/restriccionAprobacion/edit/${restriccion.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRestriccion(restriccion.id)}>Eliminar</button>
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

export default ViewRestriccionesAprobacion;
