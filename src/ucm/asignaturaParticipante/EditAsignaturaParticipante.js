import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarAsignaturaParticipante = () => {
    const { id } = useParams();
    const [asignaturaParticipante, setAsignaturaParticipante] = useState({
        name_asignature: '',
        id_carrera: '',
        id_profResponsable: '',
        year: '',
        id_proyect: ''
    });
    const [carreras, setCarreras] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);

    useEffect(() => {
        cargarAsignaturaParticipante();
        cargarCarreras();
        cargarResponsables();
        cargarProyectos();
    }, []);

    const cargarAsignaturaParticipante = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/asignaturasParticipantes/${id}`);
            setAsignaturaParticipante(response.data);
        } catch (error) {
            setError('Error al cargar la asignatura participante');
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAsignaturaParticipante({ ...asignaturaParticipante, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/asignaturasParticipantes/${id}`, asignaturaParticipante);
            setConfirmacion(true);
            window.location=('/asignaturaparticipante/view');
        } catch (error) {
            setError('Error al actualizar la asignatura participante');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Asignatura Participante</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {confirmacion && (
                            <div className="alert alert-success" role="alert">
                                ¡Asignatura Participante actualizada exitosamente!
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_asignature"
                                    value={asignaturaParticipante.name_asignature}
                                    onChange={handleChange}
                                    placeholder="Nombre de Asignatura"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_carrera"
                                    value={asignaturaParticipante.id_carrera}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una Carrera</option>
                                    {carreras.map(carrera => (
                                        <option key={carrera.id} value={carrera.id}>{carrera.name_careers}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_profResponsable"
                                    value={asignaturaParticipante.id_profResponsable}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un Usuario Responsable</option>
                                    {responsables.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="year"
                                    value={asignaturaParticipante.year}
                                    onChange={handleChange}
                                    placeholder="Año"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyect"
                                    value={asignaturaParticipante.id_proyect}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un Proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>{proyecto.name_proyect}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarAsignaturaParticipante;
