import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearProfesorParticipante = () => {
    const [formValues, setFormValues] = useState({
        id_usuario: '',
        id_rol: '',
        id_proyect: ''
    });

    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuarios();
        cargarRoles();
        cargarProyectos();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario');
            setUsuarios(response.data.filter(usuario => usuario.id_rol === 5)); // Filtrar usuarios con id_rol 5
        } catch (error) {
            console.error('Error al cargar usuarios:', error.message);
            setError('Error al cargar usuarios. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol');
            setRoles(response.data);
        } catch (error) {
            console.error('Error al cargar roles:', error.message);
            setError('Error al cargar roles. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            setProyectos(response.data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/listadoProfesoresParticipantes', formValues);
            console.log('Profesor participante creado exitosamente');
            setConfirmacion(true);
            setFormValues({
                id_usuario: '',
                id_rol: '',
                id_proyect: ''
            });
        } catch (error) {
            console.error('Error al crear profesor participante:', error.message);
            setError('Error al crear profesor participante. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Profesor Participante</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_usuario"
                                    value={formValues.id_usuario}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Usuario</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_rol"
                                    value={formValues.id_rol}
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
                                <select
                                    className="form-control"
                                    name="id_proyect"
                                    value={formValues.id_proyect}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>
                                            {proyecto.name_proyect}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Profesor participante creado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearProfesorParticipante;
