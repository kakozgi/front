import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

const Carreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [facultades, setFacultades] = useState({});
    const [sedes, setSedes] = useState({});
    const [areas, setAreas] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        cargarCarreras();
        cargarFacultades();
        cargarSedes();
        cargarAreas();
    }, []);

    const cargarCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/carrera'); 
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al cargar carreras:', error.message);
            setError('Error al cargar carreras. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarFacultades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/facultad'); 
            const facultadesMap = response.data.reduce((map, facultad) => {
                map[facultad.id] = facultad.name_facultie;
                return map;
            }, {});
            setFacultades(facultadesMap);
        } catch (error) {
            console.error('Error al cargar facultades:', error.message);
            setError('Error al cargar facultades. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarSedes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/sede'); 
            const sedesMap = response.data.reduce((map, sede) => {
                map[sede.id] = sede.name_headquarter;
                return map;
            }, {});
            setSedes(sedesMap);
        } catch (error) {
            console.error('Error al cargar sedes:', error.message);
            setError('Error al cargar sedes. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarAreas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/area'); 
            const areasMap = response.data.reduce((map, area) => {
                map[area.id] = area.name_area;
                return map;
            }, {});
            setAreas(areasMap);
        } catch (error) {
            console.error('Error al cargar áreas:', error.message);
            setError('Error al cargar áreas. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarCarrera = async (id, nombreCarrera) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la carrera "${nombreCarrera}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/carrera/${id}`); 
                setCarreras(carreras.filter(carrera => carrera.id !== id));
                console.log('Carrera eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar carrera:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Carreras</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-end mb-3">
                            <Link to="/carrera" className="btn btn-success">Nueva Carrera</Link>
                        </div>
                        <ul className="list-group">
                            {carreras.map(carrera => (
                                <li key={carrera.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{carrera.name_careers}</h5>
                                        <p className="mb-0 text-secondary">
                                            Facultad: {facultades[carrera.id_facultie] || 'N/A'}<br />
                                            Sede: {sedes[carrera.id_headquarter] || 'N/A'}<br />
                                            Área: {areas[carrera.id_area] || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarCarrera(carrera.id, carrera.name_careers)}>Eliminar</button>
                                        <Link to={`/carrera/edit/${carrera.id}`} className="btn btn-primary btn-sm">Editar</Link>
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
