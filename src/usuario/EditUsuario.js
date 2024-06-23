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
        password: '', // Added password field
        id_career: '',
        id_rol: '',
        primaryEmail: '',
        secundaryEmail: '',
        description: ''
    });
    const [roles, setRoles] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuario();
        cargarRoles();
        cargarCarreras();

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

    const cargarRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol');
            setRoles(response.data);
        } catch (error) {
            setError('Error al cargar los roles');
        }
    };

    const cargarCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/carrera');
            setCarreras(response.data);
        } catch (error) {
            setError('Error al cargar las carreras');
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
            window.location=('/usuarios/view');
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={usuario.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_career"
                                    value={usuario.id_career}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Carrera</option>
                                    {carreras.map(carrera => (
                                        <option key={carrera.id} value={carrera.id}>
                                            {carrera.name_careers}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_rol"
                                    value={usuario.id_rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Rol</option>
                                    {roles.map(rol => (
                                        <option key={rol.id} value={rol.id}>
                                            {rol.name_role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="primaryEmail"
                                    value={usuario.primaryEmail}
                                    onChange={handleChange}
                                    placeholder="Email principal"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
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
