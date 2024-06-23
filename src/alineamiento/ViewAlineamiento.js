import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const ViewAlineamiento = () => {
    const [alineamientos, setAlineamientos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlineamientos();
    }, []);

    const cargarAlineamientos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/alineamiento'); // Cambiar la URL según tu backend
            setAlineamientos(response.data);
        } catch (error) {
            console.error('Error al cargar alineamientos:', error.message);
            setError('Error al cargar alineamientos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarAlineamiento = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este alineamiento?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/alineamiento/${id}`);
                setAlineamientos(alineamientos.filter(alineamiento => alineamiento.id !== id));
                console.log('Alineamiento eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar alineamiento:', error.message);

            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Alineamientos</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                            <Link to="/alineamiento" className="btn btn-success">Nuevo Alineamiento</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre del Alineamiento</th>
                                    <th>Resultado del Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alineamientos.map(alineamiento => (
                                    <tr key={alineamiento.id}>
                                        <td>{alineamiento.name_alineamiento}</td>
                                        <td>{alineamiento.resultadoProyecto}</td>
                                        <td>
                                            <Link to={`/alineamiento/edit/${alineamiento.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarAlineamiento(alineamiento.id)}>Eliminar</button>
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

export default ViewAlineamiento;
