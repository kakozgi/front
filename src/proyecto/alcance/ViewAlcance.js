import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewAlcance = () => {
    const [alcances, setAlcances] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlcances();
    }, []);

    const cargarAlcances = async () => {
        try {
            const response = await axios.get('http://localhost:3001/alcance');
            setAlcances(response.data);
        } catch (error) {
            setError('Error al cargar los alcances');
        }
    };

    const handleEliminarAlcance = async (id, nombreAlcance) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el alcance "${nombreAlcance}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/alcance/${id}`);
                setAlcances(alcances.filter(alcance => alcance.id !== id));
                console.log('Alcance eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar alcance:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Alcances</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                        <Link to="/alcance" className="btn btn-success">Nuevo Alcance</Link>
                        </div>
                        <ul className="list-group">
                            {alcances.map(alcance => (
                                <li key={alcance.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{alcance.name_scope}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarAlcance(alcance.id, alcance.name_scope)}>Eliminar</button>
                                        <Link to={`/alcance/edit/${alcance.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ViewAlcance;
