import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearUsuario = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        lastname: '',
        rut: '',
        id_career: '',
        id_rol: '',
        primaryEmail: '',
        secundaryEmail: '',
        description: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/usuario', userData);
            console.log('Usuario creado exitosamente');
            setConfirmacion(true);
            setUserData({
                username: '',
                password: '',
                lastname: '',
                rut: '',
                id_career: '',
                id_rol: '',
                primaryEmail: '',
                secundaryEmail: '',
                description: '',
            });
        } catch (error) {
            setError('Error al crear usuario');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Usuario</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={userData.lastname}
                                    onChange={handleChange}
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rut"
                                    value={userData.rut}
                                    onChange={handleChange}
                                    placeholder="RUT"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="primaryEmail"
                                    value={userData.primaryEmail}
                                    onChange={handleChange}
                                    placeholder="Email Primario"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="secundaryEmail"
                                    value={userData.secundaryEmail}
                                    onChange={handleChange}
                                    placeholder="Email Secundario"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={userData.description}
                                    onChange={handleChange}
                                    placeholder="Descripción"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="id_career"
                                    value={userData.id_career}
                                    onChange={handleChange}
                                    placeholder="ID de Carrera"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="id_rol"
                                    value={userData.id_rol}
                                    onChange={handleChange}
                                    placeholder="ID de Rol"
                                />
                            </div>
                
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Usuario creado exitosamente!
                                </div>
                            )}
                        </form>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearUsuario;
