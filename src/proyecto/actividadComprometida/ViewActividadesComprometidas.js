import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewActividadesComprometidas = () => {
    const [actividades, setActividades] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        cargarActividades();
        cargarProyectos();
    }, []);

    const cargarActividades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/actividadesComprometidas');
            setActividades(response.data);
        } catch (error) {
            console.error('Error al cargar actividades comprometidas:', error.message);
            setError('Error al cargar actividades comprometidas. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            const proyectosMap = response.data.reduce((map, proyecto) => {
                map[proyecto.id] = proyecto.name_proyect; // Suponiendo que el campo del nombre del proyecto es 'name_proyect'
                return map;
            }, {});
            setProyectos(proyectosMap);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarActividad = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta actividad?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/actividadesComprometidas/${id}`);
                setActividades(actividades.filter(actividad => actividad.id !== id));
                console.log('Actividad eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar actividad:', error.message);
                window.location = '/actividadcomprometida/view'
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Actividades Comprometidas</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                            <Link to="/actividadcomprometida" className="btn btn-success">Nueva Actividad</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actividades.map(actividad => (
                                    <tr key={actividad.id}>
                                        <td>{actividad.name}</td>
                                        <td>{actividad.description}</td>
                                        <td>
                                            {proyectos[actividad.id_proyect] ? (
                                                <Link to={`/proyect/view/${actividad.id_proyect}`}>
                                                    {proyectos[actividad.id_proyect]}
                                                </Link>
                                            ) : (
                                                'Proyecto no encontrado'
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/actividadcomprometida/edit/${actividad.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarActividad(actividad.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewActividadesComprometidas;
