import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

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
                    <div className="col-md-8">
                        <h2 className="text-center">Lista de Usuarios</h2>
                        <ul className="list-group">
                            {usuarios.map(usuario => (
                                <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{usuario.username}</h5>
                                        <p>RUT: {usuario.rut}</p>
                                        <p>Apellido: {usuario.lastname}</p>
                                        <p>Email Principal: {usuario.primaryEmail}</p>
                                        <p>Email Secundario: {usuario.secundaryEmail}</p>
                                        <p>Descripción: {usuario.description}</p>
                                    </div>
                                    <div>
                                        <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                        <button onClick={() => handleEliminarUsuario(usuario.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
