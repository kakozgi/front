import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewCiudad = () => {
    const [ciudades, setCiudades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarCiudades();
    }, []);

    const cargarCiudades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/ciudad');
            setCiudades(response.data);
        } catch (error) {
            console.error('Error al cargar ciudades:', error.message);
            setError('Error al cargar las ciudades. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarCiudad = async (id, nombreCiudad) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la ciudad "${nombreCiudad}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/ciudad/${id}`);
                setCiudades(ciudades.filter(ciudad => ciudad.id !== id));
                console.log('Ciudad eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar ciudad:', error.message);
                setError('Error al eliminar la ciudad. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Lista de Ciudades</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-end mb-3">
                            <Link to="/ciudad" className="btn btn-success">Nueva Ciudad</Link>
                        </div>
                        <ul className="list-group">
                            {ciudades.map(ciudad => (
                                <li key={ciudad.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{ciudad.name_city}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarCiudad(ciudad.id, ciudad.name_city)}>Eliminar</button>
                                        <Link to={`/ciudad/edit/${ciudad.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ViewCiudad;
