import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../../inicionav/nav';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario');
            setUsuarios(response.data);
        } catch (error) {
            setError('Error al cargar usuarios');
        }
    };

    const handleEliminarUsuario = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/usuario/${id}`);
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            } catch (error) {
                setError('Error al eliminar usuario');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Usuarios</h2>
                        <div className="text-end mb-3">
                            <Link to="/usuarios" className="btn btn-success">Nuevo Usuario</Link>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre de Usuario</th>
                                    <th>RUT</th>
                                    <th>Carrera</th>
                                    <th>Email Principal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.rut}</td>
                                        <td>{usuario.Carrera?.name_careers}</td> 
                                        <td>{usuario.primaryEmail}</td>
                                        <td>
                                            <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <Link to={`/usuarios/${usuario.id}`} className="btn btn-info btn-sm ms-2">Detalles</Link>
                                            <button onClick={() => handleEliminarUsuario(usuario.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
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

export default Usuarios;
