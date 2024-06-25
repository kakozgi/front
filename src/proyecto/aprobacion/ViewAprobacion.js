import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewAprobaciones = () => {
    const [aprobaciones, setAprobaciones] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAprobaciones();
        cargarUsuarios();
    }, []);

    const cargarAprobaciones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/aprobaciones'); // Cambiar la URL según tu backend
            setAprobaciones(response.data);
        } catch (error) {
            console.error('Error al cargar aprobaciones:', error.message);
            setError('Error al cargar aprobaciones. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario'); // Cambiar la URL según tu backend
            const usuariosMap = response.data.reduce((map, usuario) => {
                map[usuario.id] = usuario.username;
                return map;
            }, {});
            setUsuarios(usuariosMap);
        } catch (error) {
            console.error('Error al cargar usuarios:', error.message);
            setError('Error al cargar usuarios. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarAprobacion = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta aprobación?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/aprobaciones/${id}`); // Cambiar la URL según tu backend
                setAprobaciones(aprobaciones.filter(aprobacion => aprobacion.id !== id));
                console.log('Aprobación eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar aprobación:', error.message);
                setError('Error al eliminar aprobación. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Aprobaciones</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                         <Link to="/aprobaciones" className="btn btn-success">Nueva Aprobacion</Link>
                          </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Responsable</th>
                                    <th>Fecha de Aprobación</th>
                                    <th>Descripción</th>
                                    <th>Restricciones</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aprobaciones.map(aprobacion => (
                                    <tr key={aprobacion.id}>
                                        <td>
                                            {usuarios[aprobacion.id_bossApprobation] || 'Usuario no encontrado'}
                                        </td>
                                        <td>{new Date(aprobacion.date_approbation).toLocaleDateString()}</td>
                                        <td>{aprobacion.descriptionApprobation}</td>
                                        <td>{aprobacion.restrictionApprobation}</td>
                                        <td>
                                            <Link to={`/aprobacion/edit/${aprobacion.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarAprobacion(aprobacion.id)}>Eliminar</button>
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

export default ViewAprobaciones;
