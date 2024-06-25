import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import Inicio from '../../inicionav/nav';

const ViewRiesgo = () => {
    const [riesgos, setRiesgos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRiesgos();
    }, []);

    const cargarRiesgos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/riesgo');
            setRiesgos(response.data);
        } catch (error) {
            console.error('Error al cargar riesgos:', error.message);
            setError('Error al cargar los riesgos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarRiesgo = async (id, nombreRiesgo) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el riesgo "${nombreRiesgo}"?`);
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/riesgo/${id}`);
                setRiesgos(riesgos.filter(riesgo => riesgo.id !== id));
                console.log('Riesgo eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar riesgo:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Lista de Riesgos</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-end mb-3">
                            <Link to="/riesgo" className="btn btn-success">Nuevo Riesgo</Link>
                        </div>
                        <ul className="list-group">
                            {riesgos.map(riesgo => (
                                <li key={riesgo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{riesgo.nameRiesgoAsociado}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRiesgo(riesgo.id, riesgo.nameRiesgoAsociado)}>Eliminar</button>
                                        <Link to={`/riesgo/edit/${riesgo.id}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ViewRiesgo;
