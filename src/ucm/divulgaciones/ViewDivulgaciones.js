import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom';

const Divulgaciones = () => {
    const [divulgaciones, setDivulgaciones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDivulgaciones();
    }, []);

    const cargarDivulgaciones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/divulgacion');
            setDivulgaciones(response.data);
        } catch (error) {
            setError('Error al cargar las divulgaciones');
        }
    };

    const handleEliminarDivulgacion = async (rut) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta divulgación?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/divulgacion/${rut}`);
                setDivulgaciones(divulgaciones.filter(divulgacion => divulgacion.rut !== rut));
            } catch (error) {
                setError('Error al eliminar la divulgación');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Divulgaciones</h2>
                        <div className="text-end mb-3">
                            <Link to="/divulgacion" className="btn btn-success">Nueva Divulgación</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre de la Divulgación</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {divulgaciones.map(divulgacion => (
                                    <tr key={divulgacion.id}>
                                        <td>{divulgacion.name_divulgacion}</td>
                                        <td>{divulgacion.id_proyecto ?divulgacion.id_proyecto.name_proyect : 'Sin Proyecto Asociado'}</td>
                                        <td>
                                            <Link to={`/divulgacion/edit/${divulgacion.rut}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarDivulgacion(divulgacion.rut)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
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

export default Divulgaciones;
