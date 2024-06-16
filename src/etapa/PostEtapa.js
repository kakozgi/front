// components/CrearEtapa.js

import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearEtapa = () => {
    const [nombreEtapa, setNombreEtapa] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setNombreEtapa(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/etapa', { name_stage: nombreEtapa });
            console.log('Etapa creada exitosamente:', response.data);
            setConfirmacion(true);
            setNombreEtapa('');
        } catch (error) {
            console.error('Error al crear etapa:', error.message);
            setError('Error al crear etapa. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Nueva Etapa</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombreEtapa}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Etapa"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success mt-3" role="alert">
                                    ¡Etapa creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearEtapa;
