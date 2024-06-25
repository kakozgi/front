
import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearAsignaturaParticipante = () => {
    const [asignaturaParticipante, setAsignaturaParticipante] = useState({
        name_asignature: '',
        id_carrera: '',
        id_usuario: '',
        year: '',
        id_proyect: ''
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [carreras, setCarreras] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarCarreras();
        cargarResponsables();
        cargarProyectos();
    }, []);

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
            const response = await axios.post('http://localhost:3001/asignaturasParticipantes', asignaturaParticipante);
            console.log('Asignatura Participante creada exitosamente:', response.data);
            setAsignaturaParticipante({
                name_asignature: '',
                id_carrera: '',
                id_profResponsable: '',
                year: '',
                id_proyect: ''
            });
        } catch (error) {
            setError('Error al crear la Asignatura Participante');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Asignatura Participante</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_asignature"
                                    value={asignaturaParticipante.name_asignature}
                                    onChange={handleChange}
                                    placeholder="Nombre de Asignatura"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_carrera"
                                    value={asignaturaParticipante.id_carrera}
                                    onChange={handleChange}
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
                                    name="id_usuario"
                                    value={asignaturaParticipante.id_profResponsable}
                                    onChange={handleChange}
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
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyect"
                                    value={asignaturaParticipante.id_proyect}
                                    onChange={handleChange}
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

export default CrearAsignaturaParticipante;
