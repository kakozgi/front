import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import Inicio from '../../inicionav/nav';

const ViewAmbito = () => {
    const [ambitos, setAmbitos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAmbitos();
    }, []);

    const cargarAmbitos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/ambito');
            setAmbitos(response.data);
        } catch (error) {
            console.error('Error al cargar ámbitos:', error.message);
            setError('Error al cargar los ámbitos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarAmbito = async (id, nombreAmbito) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el ámbito "${nombreAmbito}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/ambito/${id}`);
                setAmbitos(ambitos.filter(ambito => ambito.id !== id));
                console.log('Ámbito eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar ámbito:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Lista de Ámbitos</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-end mb-3">
                        <Link to="/ambito" className="btn btn-success">Nuevo Ambito</Link>
                        </div>
                        <ul className="list-group">
                            {ambitos.map(ambito => (
                                <li key={ambito.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{ambito.name_ambit}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarAmbito(ambito.id, ambito.name_ambit)}>Eliminar</button>
                                        <Link to={`/ambito/edit/${ambito.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ViewAmbito;
