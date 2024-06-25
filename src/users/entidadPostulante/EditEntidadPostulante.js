import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { useParams} from 'react-router-dom';

const EditEntidadPostulante = () => {
    const { id } = useParams();
    const [entidadData, setEntidadData] = useState({
        name_postulant_entity: '',
        email: '',
        telefono: ''
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarEntidadPostulante();
    }, []);

    const cargarEntidadPostulante = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/entidadPostulante/${id}`);
            setEntidadData(response.data);
        } catch (error) {
            console.error('Error al cargar la entidad postulante:', error.message);
            setError('Error al cargar la entidad postulante. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntidadData({ ...entidadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/entidadPostulante/${id}`, entidadData);
            console.log('Entidad postulante actualizada exitosamente');
            setConfirmacion(true);
            window.location=('/entidadpostulante/view'); // Redirige a la lista de entidades postulantes
        } catch (error) {
            console.error('Error al actualizar la entidad postulante:', error.message);
            setError('Error al actualizar la entidad postulante. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Entidad Postulante</h2>
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
                                    type="text"
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
                                    ¡Entidad postulante actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEntidadPostulante;
