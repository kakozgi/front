import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom';

const ViewAsignaturaParticipante = () => {
    const [asignaturasParticipantes, setAsignaturasParticipantes] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAsignaturasParticipantes();
        cargarCarreras();
        cargarResponsables();
        cargarProyectos();
    }, []);

    const cargarAsignaturasParticipantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/asignaturasParticipantes');
            setAsignaturasParticipantes(response.data);
        } catch (error) {
            setError('Error al cargar las asignaturas participantes');
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

    const cargarResponsables = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario');
            setResponsables(response.data);
        } catch (error) {
            setError('Error al cargar los responsables');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            setProyectos(response.data);
        } catch (error) {
            setError('Error al cargar los proyectos');
        }
    };

    const handleEliminarAsignaturaParticipante = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta asignatura participante?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/asignaturasParticipantes/${id}`);
                setAsignaturasParticipantes(asignaturasParticipantes.filter(asignatura => asignatura.id !== id));
            } catch (error) {
                setError('Error al eliminar la asignatura participante');
            }
        }
    };

    const obtenerNombreCarrera = (id) => {
        const carrera = carreras.find(carrera => carrera.id === id);
        return carrera ? carrera.name_careers : 'Sin Carrera';
    };

    const obtenerNombreResponsable = (id) => {
        const responsable = responsables.find(usuario => usuario.id === id);
        return responsable ? responsable.username : 'Sin Responsable';
    };

    const obtenerNombreProyecto = (id) => {
        const proyecto = proyectos.find(proyecto => proyecto.id === id);
        return proyecto ? proyecto.name_proyect : 'Sin Proyecto';
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Asignaturas Participantes</h2>
                        <div className="text-end mb-3">
                            <Link to="/asignaturaparticipante" className="btn btn-success">Nueva Asignatura Participante</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre de Asignatura</th>
                                    <th>Carrera</th>
                                    <th>Usuario Responsable</th>
                                    <th>Año</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asignaturasParticipantes.map(asignatura => (
                                    <tr key={asignatura.id}>
                                        <td>{asignatura.name_asignature}</td>
                                        <td>{obtenerNombreCarrera(asignatura.id_carrera)}</td>
                                        <td>{obtenerNombreResponsable(asignatura.id_profResponsable)}</td>
                                        <td>{asignatura.year}</td>
                                        <td>{obtenerNombreProyecto(asignatura.id_proyect)}</td>
                                        <td>
                                            <Link to={`/asignaturaparticipante/edit/${asignatura.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarAsignaturaParticipante(asignatura.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
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

export default ViewAsignaturaParticipante;
