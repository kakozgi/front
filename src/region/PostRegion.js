import React, { useState } from 'react';
import axios from '../axiosInstance';
import Inicio from '../inicionav/nav';

const CrearRegion = () => {
    const [regionData, setRegionData] = useState({
        name_region: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegionData({ ...regionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/region', regionData);
            console.log('Región creada exitosamente');
            setConfirmacion(true);

            setRegionData({
                name_region: '',
            });
        } catch (error) {
            console.error('Error al crear región:', error.message);
            setError('Error al crear región. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Región</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_region"
                                    value={regionData.name_region}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Región"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success mt-3" role="alert">
                                    ¡Región creada exitosamente!
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

export default CrearRegion;
