import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditDificultadNivel = () => {
    const { id } = useParams();
    const [dificultadData, setDificultadData] = useState({
        name_category: '',
        descripcion: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDificultad();

         // eslint-disable-next-line
    }, []);

    const cargarDificultad = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/dificultad/${id}`);
            setDificultadData(response.data);
        } catch (error) {
            console.error('Error al cargar la dificultad:', error.message);
            setError('Error al cargar la dificultad. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDificultadData({ ...dificultadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/dificultad/${id}`, dificultadData);
            console.log('Dificultad actualizada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
                window.location = ('/dificultad/view');
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar dificultad:', error.message);
            setError('Error al actualizar dificultad. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Dificultad</h2>
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
                                    name="name_category"
                                    value={dificultadData.name_category}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Categoría"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    value={dificultadData.descripcion}
                                    onChange={handleChange}
                                    placeholder="Descripción"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Dificultad actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDificultadNivel;
