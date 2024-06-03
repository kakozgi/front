import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const CrearCarrera = () => {
    const [carreraData, setCarreraData] = useState({
        name_careers: '',
        id_facultie: '',
        id_headquarter: '',
        id_area: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);
    const [facultades, setFacultades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarFacultades();
        cargarSedes();
        cargarAreas();
    }, []);

    const cargarFacultades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/facultad');
            setFacultades(response.data);
        } catch (error) {
            setError('Error al cargar facultades');
        }
    };

    const cargarSedes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/sede');
            setSedes(response.data);
        } catch (error) {
            setError('Error al cargar sedes');
        }
    };

    const cargarAreas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/area');
            setAreas(response.data);
        } catch (error) {
            setError('Error al cargar áreas');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarreraData({ ...carreraData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/carrera', carreraData);
            console.log('Carrera creada exitosamente');
            setConfirmacion(true);

            setCarreraData({
                name_careers: '',
                id_facultie: '',
                id_headquarter: '',
                id_area: '',
            });
        } catch (error) {
            setError('Error al crear carrera');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Formulario de Carrera</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_careers"
                                    value={carreraData.name_careers}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Carrera"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    name="id_facultie"
                                    value={carreraData.id_facultie}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una facultad</option>
                                    {facultades.map(facultad => (
                                        <option key={facultad.id} value={facultad.id}>{facultad.name_facultie}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    name="id_headquarter"
                                    value={carreraData.id_headquarter}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una sede</option>
                                    {sedes.map(sede => (
                                        <option key={sede.id} value={sede.id}>{sede.name_headquarter}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    name="id_area"
                                    value={carreraData.id_area}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un área</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.id}>{area.name_area}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Carrera creada exitosamente!
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

export default CrearCarrera;
