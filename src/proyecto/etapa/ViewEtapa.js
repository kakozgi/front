import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom'; 
import Inicio from '../../inicionav/nav';

const Etapas = () => {
    const [etapas, setEtapas] = useState([]);

    useEffect(() => {
        cargarEtapas();
    }, []);

    const cargarEtapas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/etapa'); 
            setEtapas(response.data);
        } catch (error) {
            console.error('Error al cargar etapas:', error.message);
        }
    };

    const handleEliminarEtapa = async (id, nombreEtapa) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la etapa "${nombreEtapa}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/etapa/${id}`); 
                setEtapas(etapas.filter(etapa => etapa.id !== id));
                console.log('Etapa eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar etapa:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container">
                <h1 className="text-center mt-5 mb-4">Lista de Etapas</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="text-end mb-3">
                        <Link to="/etapa" className="btn btn-success">Nueva Etapa</Link>
                        </div>
                        <ul className="list-group">
                            {etapas.map(etapa => (
                                <li key={etapa.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{etapa.name_stage}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarEtapa(etapa.id, etapa.name_stage)}>Eliminar</button>
                                        <Link to={`/etapa/edit/${etapa.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default Etapas;
