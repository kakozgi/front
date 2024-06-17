import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        cargarRoles();
    }, []);

    const cargarRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol'); 
            setRoles(response.data);
        } catch (error) {
            console.error('Error al cargar Roles:', error.message);
        }
    };

    const handleEliminarRoles = async (id, nombreRol) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el Rol "${nombreRol}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/rol/${id}`);
                setRoles(roles.filter(rol => rol.id !== id));
                console.log('Rol eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar Rol:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Roles</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="text-end mb-3">
                        <Link to="/rol" className="btn btn-success">Nuevo Rol</Link>
                        </div>
                        <ul className="list-group">
                            {roles.map(rol => (
                                <li key={rol.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{rol.name_role}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRoles(rol.id, rol.name_role)}>Eliminar</button>
                                        <Link to={`/rol/editar/${rol.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roles;
