import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Inicio from '../inicionav/nav';
import { obtenerRolUsuario } from '../Auth'; // Asegúrate de que esta ruta sea correcta

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Obtener el rol del usuario del almacenamiento local al cargar el componente
        const storedRole = obtenerRolUsuario();
        setUserRole(storedRole);
        
        cargarAreas(); // Llamar a cargarAreas sin condición de rol, ya que userRole se establecerá cuando el rol se obtenga
    }, []);

    const cargarAreas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/area');
            setAreas(response.data);
        } catch (error) {
            console.error('Error al cargar áreas:', error.message);
        }
    };

    const handleEliminarArea = async (id, nombreArea) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el área "${nombreArea}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/area/${id}`);
                setAreas(areas.filter(area => area.id !== id));
                console.log('Área eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar área:', error.message);
            }
        }
    };

    // Función para imprimir el rol del usuario
    const imprimirRolUsuario = () => {
        console.log('Rol del usuario:', userRole);
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Áreas</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <button onClick={imprimirRolUsuario} className="btn btn-primary mb-3">Imprimir Rol</button>
                        <ul className="list-group">
                            {areas.map(area => (
                                <li key={area.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{area.name_area}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarArea(area.id, area.name_area)}>Eliminar</button>
                                        <Link to={`/area/editar/${area.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Areas;
