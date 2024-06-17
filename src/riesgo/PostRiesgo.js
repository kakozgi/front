import React, { useState } from 'react';
import axios from '../axiosInstance';
import Inicio from '../inicionav/nav';

const CrearRiesgo = () => {
    const [nombreRiesgo, setNombreRiesgo] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setNombreRiesgo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/riesgo', { nameRiesgoAsociado: nombreRiesgo });
            console.log('Riesgo creado exitosamente');
            setConfirmacion(true);

            setNombreRiesgo('');
        } catch (error) {
            console.error('Error al crear riesgo:', error.message);
            setError('Error al crear riesgo. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Riesgo</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nameRiesgoAsociado"
                                    value={nombreRiesgo}
                                    onChange={handleChange}
                                    placeholder="Nombre del Riesgo"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success mt-3" role="alert">
                                    ¡Riesgo creado exitosamente!
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearRiesgo;
