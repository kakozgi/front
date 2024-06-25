import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearUsuario = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        lastname: '',
        rut: '',
        id_career: '', // Ahora será seleccionable
        id_rol: '', // Ahora será seleccionable
        primaryEmail: '',
        secundaryEmail: '',
        description: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');
    const [careers, setCareers] = useState([]); // Lista de carreras
    const [roles, setRoles] = useState([]); // Lista de roles

    useEffect(() => {
        cargarCarreras();
        cargarRoles();
    }, []);

    const cargarCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/carrera'); // Cambiar la URL según tu backend
            setCareers(response.data);
        } catch (error) {
            console.error('Error al cargar carreras:', error.message);
            setError('Error al cargar carreras. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol'); // Cambiar la URL según tu backend
            setRoles(response.data);
        } catch (error) {
            console.error('Error al cargar roles:', error.message);
            setError('Error al cargar roles. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/usuario', userData); // Cambiar la URL según tu backend
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
            console.error('Error al crear usuario:', error.message);
            setError('Error al crear usuario. Verifica los datos e intenta nuevamente.');
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
                                    required
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
                                    required
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
                                <label htmlFor="id_career" className="form-label">Carrera:</label>
                                <select
                                    id="id_career"
                                    name="id_career"
                                    className="form-control"
                                    value={userData.id_career}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una carrera</option>
                                    {careers.map(carrera => (
                                        <option key={carrera.id} value={carrera.id}>{carrera.name_careers}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_rol" className="form-label">Rol:</label>
                                <select
                                    id="id_rol"
                                    name="id_rol"
                                    className="form-control"
                                    value={userData.id_rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un rol</option>
                                    {roles.map(rol => (
                                        <option key={rol.id} value={rol.id}>{rol.name_role}</option>
                                    ))}
                                </select>
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
