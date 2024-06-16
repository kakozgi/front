import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

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
            setError('Error al cargar ciudades');
            console.error('Error al cargar ciudades:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Lista de Ciudades</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <ul className="list-group">
                            {ciudades.map(ciudad => (
                                <li key={ciudad.id} className="list-group-item">
                                    {ciudad.name_city}
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
