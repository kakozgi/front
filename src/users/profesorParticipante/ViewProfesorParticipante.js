import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom'; // Si estás utilizando React Router para la navegación

const ViewProfesorParticipante = () => {
    const [profesoresParticipantes, setProfesoresParticipantes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProfesoresParticipantes();
        cargarUsuarios();
        cargarRoles();
        cargarProyectos();
    }, []);

    const cargarProfesoresParticipantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/listadoProfesoresParticipantes');
            setProfesoresParticipantes(response.data);
        } catch (error) {
            console.error('Error al cargar profesores participantes:', error.message);
            setError('Error al cargar profesores participantes. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario');
            setUsuarios(response.data);
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

    const handleEliminarProfesorParticipante = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este profesor participante?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/listadoProfesoresParticipantes/${id}`);
                setProfesoresParticipantes(profesoresParticipantes.filter(profesor => profesor.id !== id));
            } catch (error) {
                window.location = '/profesorparticipante/view'
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Profesores Participantes</h2>
                        <div className="text-end mb-3">
                            <Link to="/profesorparticipante" className="btn btn-success">Nuevo Profesor Participante</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Rol</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profesoresParticipantes.map(profesor => (
                                    <tr key={profesor.id}>
                                        <td>{usuarios.find(usuario => usuario.id === profesor.id_usuario)?.username}</td>
                                        <td>{roles.find(rol => rol.id === profesor.id_rol)?.name_role}</td>
                                        <td>{proyectos.find(proyecto => proyecto.id === profesor.id_proyect)?.name_proyect}</td>
                                        <td>
                                            <Link to={`/profesorparticipante/edit/${profesor.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarProfesorParticipante(profesor.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfesorParticipante;
