import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const PostRestriccionAprobacion = () => {
    const [restriccionData, setRestriccionData] = useState({
        nameRestriccion: '',
        descripcion: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestriccionData({ ...restriccionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/restriccionAprobacion', restriccionData); // Cambia la URL según tu backend
            console.log('Restricción creada exitosamente');
            setConfirmacion(true);
            setRestriccionData({
                nameRestriccion: '',
                descripcion: '',
            });
        } catch (error) {
            console.error('Error al crear restricción:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Restricción de Aprobación</h2>
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
                                    ¡Restricción creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostRestriccionAprobacion;
