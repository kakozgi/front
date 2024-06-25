import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarAlumnoParticipante = () => {
    const { id } = useParams();
    const [alumnoData, setAlumnoData] = useState({
        name_alumno: '',
        id_carrera: '',
        id_asignaturaParticipante: ''
    });
    const [carreras, setCarreras] = useState([]);
    const [asignaturasParticipantes, setAsignaturasParticipantes] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumno();
        cargarCarreras();
        cargarAsignaturasParticipantes();
    }, []);

    const cargarAlumno = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/alumnosParticipantes/${id}`);
            setAlumnoData(response.data);
        } catch (error) {
            console.error('Error al cargar alumno participante:', error.message);
            setError('Error al cargar alumno participante. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/carrera');
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al cargar carreras:', error.message);
            setError('Error al cargar carreras. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarAsignaturasParticipantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/asignaturasParticipantes');
            setAsignaturasParticipantes(response.data);
        } catch (error) {
            console.error('Error al cargar asignaturas participantes:', error.message);
            setError('Error al cargar asignaturas participantes. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumnoData({ ...alumnoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/alumnosParticipantes/${id}`, alumnoData);
            console.log('Alumno participante actualizado exitosamente');
            setConfirmacion(true);
            window.location=('/alumnoparticipante/view');
        } catch (error) {
            console.error('Error al actualizar alumno participante:', error.message);
            setError('Error al actualizar alumno participante. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Alumno Participante</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_alumno"
                                    value={alumnoData.name_alumno}
                                    onChange={handleChange}
                                    placeholder="Nombre del Alumno"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_carrera"
                                    value={alumnoData.id_carrera}
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
                                    name="id_asignaturaParticipante"
                                    value={alumnoData.id_asignaturaParticipante}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Asignatura Participante</option>
                                    {asignaturasParticipantes.map(asignatura => (
                                        <option key={asignatura.id} value={asignatura.id}>
                                            {asignatura.name_asignature}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Alumno participante actualizado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarAlumnoParticipante;
