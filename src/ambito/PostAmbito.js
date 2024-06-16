import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearAmbito = () => {
    const [ambitoData, setAmbitoData] = useState({
        name_ambit: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAmbitoData({ ...ambitoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/ambito', ambitoData);
            console.log('Ámbito creado exitosamente');
            setConfirmacion(true);

            setAmbitoData({
                name_ambit: '',
            });
        } catch (error) {
            console.error('Error al crear ámbito:', error.message);
            setError('Error al crear ámbito. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Ámbito</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_ambit"
                                    value={ambitoData.name_ambit}
                                    onChange={handleChange}
                                    placeholder="Nombre del Ámbito"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success mt-3" role="alert">
                                    ¡Ámbito creado exitosamente!
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

export default CrearAmbito;
