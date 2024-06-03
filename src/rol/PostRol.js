import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearRol = () => {
    const [rolData, setRolData] = useState({
        name_role: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRolData({ ...rolData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/rol', rolData);
            console.log('Rol creada exitosamente');
            setConfirmacion(true);

            setRolData({
                name_role: '',
            });
        } catch (error) {
            console.error('Error al crear Rol:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Rol</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_role"
                                    value={rolData.name_role}
                                    onChange={handleChange}
                                    placeholder="Nombre del Rol"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Rol creado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearRol;
