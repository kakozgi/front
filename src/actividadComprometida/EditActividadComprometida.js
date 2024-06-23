import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams} from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditActividadComprometida = () => {
    const { id } = useParams();
    const [actividadData, setActividadData] = useState({
        name: '',
        description: '',
        id_proyect: ''
    });
    const [proyectos, setProyectos] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarActividad();
        cargarProyectos();
        // eslint-disable-next-line 
    }, []);

    const cargarActividad = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/actividadesComprometidas/${id}`);
            setActividadData(response.data);
        } catch (error) {
            console.error('Error al cargar la actividad comprometida:', error.message);
            setError('Error al cargar la actividad comprometida. Inténtalo de nuevo más tarde.');
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
        setActividadData({ ...actividadData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/actividadesComprometidas/${id}`, actividadData);
            console.log('Actividad comprometida actualizada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
                window.location=('/actividadesComprometidas/view');
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar la actividad comprometida:', error.message);
            setError('Error al actualizar la actividad comprometida. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Actividad Comprometida</h2>
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
                                    value={actividadData.name}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Actividad"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={actividadData.description}
                                    onChange={handleChange}
                                    placeholder="Descripción"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_proyect" className="form-label">Proyecto:</label>
                                <select
                                    id="id_proyect"
                                    name="id_proyect"
                                    className="form-control"
                                    value={actividadData.id_proyect}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>{proyecto.name_proyect}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Actividad comprometida actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditActividadComprometida;
