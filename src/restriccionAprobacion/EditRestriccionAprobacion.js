import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams} from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditRestriccionAprobacion = () => {
    const { id } = useParams();
    const [restriccionData, setRestriccionData] = useState({
        nameRestriccion: '',
        descripcion: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRestriccion();
        // eslint-disable-next-line 
    }, [id]);

    const cargarRestriccion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/restriccionAprobacion/${id}`);
            setRestriccionData(response.data);
        } catch (error) {
            console.error('Error al cargar restricción:', error.message);
            setError('Error al cargar la restricción. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestriccionData({ ...restriccionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/restriccionAprobacion/${id}`, restriccionData);
            console.log('Restricción actualizada exitosamente');
            setConfirmacion(true);

            setTimeout(() => {
               window.location = ('/restriccionaprobacion/view'); // Redirigir a la vista de restricciones después de unos segundos
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar restricción:', error.message);
            setError('Error al actualizar la restricción. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Restricción de Aprobación</h2>
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
                                    name="nameRestriccion"
                                    value={restriccionData.nameRestriccion}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Restricción"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    name="descripcion"
                                    value={restriccionData.descripcion}
                                    onChange={handleChange}
                                    placeholder="Descripción"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Restricción actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRestriccionAprobacion;
