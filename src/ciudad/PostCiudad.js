import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearCiudad = () => {
    const [ciudadData, setCiudadData] = useState({
        name_city: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCiudadData({ ...ciudadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/ciudad', ciudadData);
            console.log('Ciudad creada exitosamente');
            setConfirmacion(true);

            setCiudadData({
                name_city: '',
            });
        } catch (error) {
            console.error('Error al crear Ciudad:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Ciudad</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_city"
                                    value={ciudadData.name_city}
                                    onChange={handleChange}
                                    placeholder="Nombre del Área"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Ciudad creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearCiudad;
