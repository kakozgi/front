import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom'; // Asegúrate de tener configurado React Router en tu aplicación

const ViewEntidadesPostulantes = () => {
    const [entidades, setEntidades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarEntidadesPostulantes();
    }, []);

    const cargarEntidadesPostulantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/entidadPostulante');
            setEntidades(response.data);
        } catch (error) {
            console.error('Error al cargar entidades postulantes:', error.message);
            setError('Error al cargar entidades postulantes. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarEntidad = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta entidad postulante?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/entidadPostulante/${id}`);
                setEntidades(entidades.filter(entidad => entidad.id !== id));
            } catch (error) {
                console.error('Error al eliminar entidad postulante:', error.message);
               window.location = '/entidadpostulante/view'
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Entidades Postulantes</h2>
                        <div className="text-end mb-3">
                            <Link to="/entidadpostulante" className="btn btn-success">Nueva Entidad Postulante</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre de la Entidad</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entidades.map(entidad => (
                                    <tr key={entidad.id}>
                                        <td>{entidad.name_postulant_entity}</td>
                                        <td>{entidad.email}</td>
                                        <td>{entidad.telefono}</td>
                                        <td>
                                            <Link to={`/entidadpostulante/edit/${entidad.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarEntidad(entidad.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
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

export default ViewEntidadesPostulantes;
