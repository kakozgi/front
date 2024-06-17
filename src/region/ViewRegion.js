import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import Inicio from '../inicionav/nav';

const ViewRegion = () => {
    const [regiones, setRegiones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRegiones();
    }, []);

    const cargarRegiones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/region');
            setRegiones(response.data);
        } catch (error) {
            console.error('Error al cargar regiones:', error.message);
            setError('Error al cargar las regiones. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarRegion = async (id, nombreRegion) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la región "${nombreRegion}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/region/${id}`);
                setRegiones(regiones.filter(region => region.id !== id));
                console.log('Región eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar región:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Lista de Regiones</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-end mb-3">
                            <Link to="/region" className="btn btn-success">Nueva Región</Link>
                        </div>
                        <ul className="list-group">
                            {regiones.map(region => (
                                <li key={region.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{region.name_region}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRegion(region.id, region.name_region)}>Eliminar</button>
                                        <Link to={`/region/edit/${region.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ViewRegion;
