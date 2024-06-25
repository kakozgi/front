import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearEntidadPostulante = () => {
    const [entidadData, setEntidadData] = useState({
        name_postulant_entity: '',
        email: '',
        telefono: ''
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntidadData({ ...entidadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/entidadPostulante', entidadData);
            console.log('Entidad postulante creada exitosamente');
            setConfirmacion(true);
            setEntidadData({
                name_postulant_entity: '',
                email: '',
                telefono: ''
            });
        } catch (error) {
            console.error('Error al crear entidad postulante:', error.message);
            setError('Error al crear entidad postulante. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Entidad Postulante</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_postulant_entity"
                                    value={entidadData.name_postulant_entity}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Entidad"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={entidadData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="telefono"
                                    value={entidadData.telefono}
                                    onChange={handleChange}
                                    placeholder="Teléfono"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Entidad postulante creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearEntidadPostulante;
