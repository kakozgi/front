import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearComuna = () => {
    const [comunaData, setComunaData] = useState({
        name_commune: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComunaData({ ...comunaData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/comuna', comunaData);
            console.log('comuna creada exitosamente');
            setConfirmacion(true);

            setComunaData({
                name_commune: '',
            });
        } catch (error) {
            console.error('Error al crear área:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Comuna</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_commune"
                                    value={comunaData.name_commune}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Comuna"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Comuna creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearComuna;
