import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';
import './viewproyect.css'

const Proyectos = () => {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto'); 
            setProyectos(response.data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
        }
    };

    const handleEliminarProyecto = async (id, nameProyecto) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${nameProyecto}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/proyecto/${id}`);
                setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
                console.log('Proyecto eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar proyecto:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio></Inicio>
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Proyectos</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ul className="list-group">
                            {proyectos.map(proyecto => (
                                <li key={proyecto.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{proyecto.name_proyect}</h5>
                                        <p className="mb-0 text-secondary">{proyecto.description}</p>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProyecto(proyecto.id, proyecto.name_proyect)}>Eliminar</button>
                                        <Link to={`/editar/${proyecto.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Proyectos;
