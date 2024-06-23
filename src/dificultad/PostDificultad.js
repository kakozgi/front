import React, { useState } from 'react';
import axios from '../axiosInstance';
import Inicio from '../inicionav/nav';

const PostDificultadNivel = () => {
    const [dificultadData, setDificultadData] = useState({
        name_category: '',
        descripcion: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDificultadData({ ...dificultadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/dificultad', dificultadData);
            console.log('Dificultad creada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
            }, 2000);
            setDificultadData({
                name_category: '',
                descripcion: '',
            });
        } catch (error) {
            console.error('Error al crear dificultad:', error.message);
            setError('Error al crear dificultad. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Dificultad</h2>
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
                                    ¡Dificultad creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDificultadNivel;
