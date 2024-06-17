import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarUsuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        rut: '',
        username: '',
        lastname: '',
        primaryEmail: '',
        secundaryEmail: '',
        description: ''
    });
    const [error, setError] = useState('');
    useEffect(() => {
        
        cargarUsuario();
        // eslint-disable-next-line 
    }, []);

    const cargarUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/usuario/${id}`);
            setUsuario(response.data);
        } catch (error) {
            setError('Error al cargar el usuario');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/usuario/${id}`, usuario);
            console.log('Usuario actualizado exitosamente');
            window.location = '/usuarios';
        } catch (error) {
            setError('Error al actualizar el usuario');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Usuario</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rut"
                                    value={usuario.rut}
                                    onChange={handleChange}
                                    placeholder="RUT"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={usuario.username}
                                    onChange={handleChange}
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={usuario.lastname}
                                    onChange={handleChange}
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="primaryEmail"
                                    value={usuario.primaryEmail}
                                    onChange={handleChange}
                                    placeholder="Email principal"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="secundaryEmail"
                                    value={usuario.secundaryEmail}
                                    onChange={handleChange}
                                    placeholder="Email secundario"
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={usuario.description}
                                    onChange={handleChange}
                                    placeholder="Descripción"
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar Cambios</button>
                            </div>
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;
