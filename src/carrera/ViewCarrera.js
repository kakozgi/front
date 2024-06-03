import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa el componente Link
import Inicio from '../inicionav/nav';


const Carreras = () => {
    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        cargarCarreras();
    }, []);

    const cargarCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/carrera'); // Ajusta la ruta de la API según corresponda
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al cargar carreras:', error.message);
        }
    };

    const handleEliminarCarrera = async (id, nombreCarrera) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la carrera "${nombreCarrera}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/carrera/${id}`); // Ajusta la ruta de la API según corresponda
                setCarreras(carreras.filter(carrera => carrera.id !== id));
                console.log('Carrera eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar carrera:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio></Inicio>
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Carreras</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ul className="list-group">
                            {carreras.map(carrera => (
                                <li key={carrera.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{carrera.name_careers}</h5>
                                        <p className="mb-0 text-secondary">{carrera.id}</p>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarCarrera(carrera.id, carrera.nombre)}>Eliminar</button>
                                        <Link to={`/editar/${carrera.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Carreras;
