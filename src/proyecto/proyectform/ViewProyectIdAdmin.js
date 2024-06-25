import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link, useParams } from 'react-router-dom';

const DetalleProyectoadmin = () => {
    const { id } = useParams(); // Obtener el ID del proyecto de los parámetros de la URL

    const [proyecto, setProyecto] = useState(null);
    const [etapa, setEtapa] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [scope, setScope] = useState('');
    const [ambito, setAmbito] = useState('');
    const [riesgo, setRiesgo] = useState('');
    const [alineamiento, setAlineamiento] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProyecto();
    }, []);

    useEffect(() => {
        if (proyecto) {
            cargarEtapa();
            cargarModalidad();
            cargarScope();
            cargarAmbito();
            cargarRiesgo();
            cargarAlineamiento();
        }
    }, [proyecto]);

    const cargarProyecto = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/proyecto/${id}`);
            setProyecto(response.data);
        } catch (error) {
            console.error('Error al cargar el proyecto:', error.message);
            setError('Error al cargar el proyecto. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarEtapa = async () => {
        try {
            const etapaResponse = await axios.get(`http://localhost:3001/etapa`);
            setEtapa(etapaResponse.data.name_etapa);
        } catch (error) {
            console.error('Error al cargar la etapa:', error.message);
            setError('Error al cargar la etapa. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarModalidad = async () => {
        try {
            const modalidadResponse = await axios.get(`http://localhost:3001/modalidad`);
            setModalidad(modalidadResponse.data.name_modalidad);
        } catch (error) {
            console.error('Error al cargar la modalidad:', error.message);
            setError('Error al cargar la modalidad. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarScope = async () => {
        try {
            const scopeResponse = await axios.get(`http://localhost:3001/alcance`);
            setScope(scopeResponse.data.name_scope);
        } catch (error) {
            console.error('Error al cargar el scope:', error.message);
            setError('Error al cargar el scope. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarAmbito = async () => {
        try {
            const ambitoResponse = await axios.get(`http://localhost:3001/ambito`);
            setAmbito(ambitoResponse.data.name_ambit);
        } catch (error) {
            console.error('Error al cargar el ámbito:', error.message);
            setError('Error al cargar el ámbito. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarRiesgo = async () => {
        try {
            const riesgoResponse = await axios.get(`http://localhost:3001/riesgo`);
            setRiesgo(riesgoResponse.data.nameRiesgoAsociado);
        } catch (error) {
            console.error('Error al cargar el riesgo asociado:', error.message);
            setError('Error al cargar el riesgo asociado. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarAlineamiento = async () => {
        try {
            const alineamientoResponse = await axios.get(`http://localhost:3001/alineamiento`);
            setAlineamiento(alineamientoResponse.data.name_alineamiento);
        } catch (error) {
            console.error('Error al cargar el alineamiento con facultad:', error.message);
            setError('Error al cargar el alineamiento con facultad. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarProyecto = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/proyecto/${id}`);
                window.location = '/proyectos/view'; // Redireccionar a la lista de proyectos después de eliminar
            } catch (error) {
                setError('Error al eliminar el proyecto');
            }
        }
    };

    if (!proyecto) {
        return (
            <div>
                <Inicio />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h2 className="text-center">Detalles del Proyecto</h2>
                            <p>Cargando proyecto...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Detalles del Proyecto</h2>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{proyecto.name_proyect}</h5>
                                <p className="card-text"><strong>Versión:</strong> {proyecto.versionProyect}</p>
                                <p className="card-text"><strong>Descripción:</strong> {proyecto.description}</p>
                                <p className="card-text"><strong>Recomendaciones:</strong> {proyecto.recomendaciones}</p>
                                <p className="card-text"><strong>Restricciones:</strong> {proyecto.restriccciones}</p>
                                <p className="card-text"><strong>Total de Dinero Aprobado:</strong> {proyecto.totalDineroAprobacion}</p>
                                <p className="card-text"><strong>Recursos Gastados:</strong> {proyecto.recursosGastados}</p>
                                <p className="card-text"><strong>Fecha de Ejecución:</strong> {proyecto.fechaejecucion}</p>
                                <p className="card-text"><strong>Fecha de Inicio:</strong> {proyecto.startDate}</p>
                                <p className="card-text"><strong>Fecha de Actualización:</strong> {proyecto.updateDate}</p>
                                <p className="card-text"><strong>Fecha Final:</strong> {proyecto.finalDate}</p>
                                <p className="card-text"><strong>Descripción:</strong> {proyecto.descripcion}</p>
                                <p className="card-text"><strong>Etapa:</strong> {etapa}</p>
                                <p className="card-text"><strong>Modalidad:</strong> {modalidad}</p>
                                <p className="card-text"><strong>Alcance:</strong> {scope}</p>
                                <p className="card-text"><strong>Ámbito:</strong> {ambito}</p>
                                <p className="card-text"><strong>Riesgo Asociado:</strong> {riesgo}</p>
                                <p className="card-text"><strong>Alineamiento con Facultad:</strong> {alineamiento}</p>
                                <Link to={`/proyecto/edit/${proyecto.id}`} className="btn btn-primary me-2">Editar</Link>
                                <button onClick={handleEliminarProyecto} className="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
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

export default DetalleProyectoadmin;
