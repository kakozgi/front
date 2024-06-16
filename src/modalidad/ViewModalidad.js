import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

const Modalidades = () => {
    const [modalidades, setModalidades] = useState([]);

    useEffect(() => {
        cargarModalidades();
    }, []);

    const cargarModalidades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/modalidad'); 
            setModalidades(response.data);
        } catch (error) {
            console.error('Error al cargar modalidades:', error.message);
        }
    };

    const handleEliminarModalidad = async (id, nombreModalidad) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la modalidad "${nombreModalidad}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/modalidad/${id}`); 
                // Filtrar y actualizar el estado después de eliminar
                setModalidades(modalidades.filter(modalidad => modalidad.id !== id));
                console.log('Modalidad eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar modalidad:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Modalidades</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ul className="list-group">
                            {modalidades.map(modalidad => (
                                <li key={modalidad.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{modalidad.name_modality}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarModalidad(modalidad.id, modalidad.name_modality)}>Eliminar</button>
                                        <Link to={`/modalidad/edit/${modalidad.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Modalidades;
