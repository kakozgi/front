import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams, Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const DetallesUsuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuario();
            
    // eslint-disable-next-line 
}, []);
    

    const cargarUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/usuario/${id}`);
            setUsuario(response.data);
        } catch (error) {
            setError('Error al cargar el usuario');
        }
    };

    if (error) {
        return (
            <div>
                <Inicio />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div>
                <Inicio />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <p>Cargando...</p>
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
                    <div className="col-md-8">
                        <h2 className="text-center">Detalles del Usuario</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{usuario.id}</td>
                                </tr>
                                <tr>
                                    <th>RUT</th>
                                    <td>{usuario.rut}</td>
                                </tr>
                                <tr>
                                    <th>Nombre de Usuario</th>
                                    <td>{usuario.username}</td>
                                </tr>
                                <tr>
                                    <th>Apellido</th>
                                    <td>{usuario.lastname}</td>
                                </tr>
                                <tr>
                                    <th>ID Carrera</th>
                                    <td>{usuario.id_career}</td>
                                </tr>
                                <tr>
                                    <th>ID Rol</th>
                                    <td>{usuario.id_rol}</td>
                                </tr>
                                <tr>
                                    <th>Email Principal</th>
                                    <td>{usuario.primaryEmail}</td>
                                </tr>
                                <tr>
                                    <th>Email Secundario</th>
                                    <td>{usuario.secundaryEmail}</td>
                                </tr>
                                <tr>
                                    <th>Descripción</th>
                                    <td>{usuario.description}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary">Editar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesUsuario;
