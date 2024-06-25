import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../../inicionav/nav';

const Comunas = () => {
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        cargarComunas();
    }, []);

    const cargarComunas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/comuna'); 
            setComunas(response.data);
        } catch (error) {
            console.error('Error al cargar áreas:', error.message);
        }
    };

    const handleEliminarComuna = async (id, nombreComuna) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el área "${nombreComuna}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/comuna/${id}`); 
                setComunas(comunas.filter(comuna => comuna.id !== id));
                console.log('Comuna eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar comuna:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Comunas</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="text-end mb-3">
                        <Link to="/comuna" className="btn btn-success">Nueva Comuna</Link>
                        </div>
                        <ul className="list-group">
                            {comunas.map(comuna => (
                                <li key={comuna.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{comuna.name_commune}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarComuna(comuna.id, comuna.name_commune)}>Eliminar</button>
                                        <Link to={`/comuna/editar/${comuna.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Comunas;
