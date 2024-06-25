import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { useParams } from 'react-router-dom';

const EditAlumnoVoluntario = () => {
    const { id } = useParams(); 

    const [alumnoVoluntarioData, setAlumnoVoluntarioData] = useState({
        name: '',
        rut: '',
        id_proyect: ''
    });
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnoVoluntario();
        cargarProyectos();
    }, []);

    const cargarAlumnoVoluntario = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/listadoAlumnosVoluntarios/${id}`);
            setAlumnoVoluntarioData(response.data);
        } catch (error) {
            console.error('Error al cargar el alumno voluntario:', error.message);
            setError('Error al cargar el alumno voluntario. Inténtalo de nuevo más tarde.');
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
        setAlumnoVoluntarioData({ ...alumnoVoluntarioData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/listadoAlumnosVoluntarios/${id}`, alumnoVoluntarioData);
            console.log('Alumno voluntario actualizado exitosamente');
            window.location=('/alumnovoluntario/view'); // Redirigir a la lista de alumnos voluntarios después de editar
        } catch (error) {
            console.error('Error al editar alumno voluntario:', error.message);
            setError('Error al editar alumno voluntario. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Alumno Voluntario</h2>
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
                                    name="name"
                                    value={alumnoVoluntarioData.name}
                                    onChange={handleChange}
                                    placeholder="Nombre del Alumno"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rut"
                                    value={alumnoVoluntarioData.rut}
                                    onChange={handleChange}
                                    placeholder="RUT del Alumno"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyect"
                                    value={alumnoVoluntarioData.id_proyect}
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
                                <button type="submit" className="btn btn-primary px-5">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAlumnoVoluntario;
