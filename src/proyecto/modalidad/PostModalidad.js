import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearModalidad = () => {
    const [modalidadData, setModalidadData] = useState({
        name_modality: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalidadData({ ...modalidadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/modalidad', modalidadData);
            console.log('Modalidad creada exitosamente');
            setConfirmacion(true);

            setModalidadData({
                name_modality: '',
            });
        } catch (error) {
            console.error('Error al crear modalidad:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Modalidad</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_modality"
                                    value={modalidadData.name_modality}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Modalidad"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Modalidad creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearModalidad;
