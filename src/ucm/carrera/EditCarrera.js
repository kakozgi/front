import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarCarrera = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carrera, setCarrera] = useState({
        name_careers: '',
        id_facultie: '',
        id_headquarter: '',
        id_area: '',
    });
    const [facultades, setFacultades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);

    useEffect(() => {
        cargarCarrera();
        cargarFacultades();
        cargarSedes();
        cargarAreas();

         // eslint-disable-next-line
    }, []);

    const cargarCarrera = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/carrera/${id}`);
            setCarrera(response.data);
        } catch (error) {
            console.error('Error al cargar la carrera:', error.message);
            setError('Error al cargar la carrera. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarFacultades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/facultad');
            setFacultades(response.data);
        } catch (error) {
            console.error('Error al cargar facultades:', error.message);
            setError('Error al cargar facultades. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarSedes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/sede');
            setSedes(response.data);
        } catch (error) {
            console.error('Error al cargar sedes:', error.message);
            setError('Error al cargar sedes. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarAreas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/area');
            setAreas(response.data);
        } catch (error) {
            console.error('Error al cargar áreas:', error.message);
            setError('Error al cargar áreas. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarrera({ ...carrera, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/carrera/${id}`, carrera);
            console.log('Carrera actualizada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
                navigate('/carrera/view');
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar la carrera:', error.message);
            setError('Error al actualizar la carrera. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Carrera</h2>
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
                                    name="name_careers"
                                    value={carrera.name_careers}
                                    onChange={handleChange}
                                    placeholder="Nombre de la carrera"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_facultie" className="form-label">Facultad:</label>
                                <select
                                    id="id_facultie"
                                    name="id_facultie"
                                    className="form-control"
                                    value={carrera.id_facultie}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una facultad</option>
                                    {facultades.map(facultad => (
                                        <option key={facultad.id} value={facultad.id}>{facultad.name_facultie}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_headquarter" className="form-label">Sede:</label>
                                <select
                                    id="id_headquarter"
                                    name="id_headquarter"
                                    className="form-control"
                                    value={carrera.id_headquarter}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una sede</option>
                                    {sedes.map(sede => (
                                        <option key={sede.id} value={sede.id}>{sede.name_headquarter}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_area" className="form-label">Área:</label>
                                <select
                                    id="id_area"
                                    name="id_area"
                                    className="form-control"
                                    value={carrera.id_area}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un área</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.id}>{area.name_area}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Carrera actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarCarrera;
