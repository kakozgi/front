import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

const Sedes = () => {
    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        cargarSedes();
    }, []);

    const cargarSedes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/sede'); 
            setSedes(response.data);
        } catch (error) {
            console.error('Error al cargar sedes:', error.message);
        }
    };

    const handleEliminarSede = async (id, nombreSede) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la sede "${nombreSede}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/sede/${id}`); 
                setSedes(sedes.filter(sede => sede.id !== id));
                console.log('Sede eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar sede:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio></Inicio>
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Sedes</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="text-end mb-3">
                        <Link to="/sede" className="btn btn-success">Nueva Sede</Link>
                        </div>
                        <ul className="list-group">
                            {sedes.map(sede => (
                                <li key={sede.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{sede.name_headquarter}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarSede(sede.id, sede.name_headquarter)}>Eliminar</button>
                                        <Link to={`/sede/editar/${sede.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Sedes;
