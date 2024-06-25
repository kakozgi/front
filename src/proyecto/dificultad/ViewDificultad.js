import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewDificultadNivel = () => {
    const [dificultades, setDificultades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDificultades();
    }, []);

    const cargarDificultades = async () => {
        try {
            const response = await axios.get('http://localhost:3001/dificultad');
            setDificultades(response.data);
        } catch (error) {
            console.error('Error al cargar dificultades:', error.message);
            setError('Error al cargar dificultades. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarDificultad = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta dificultad?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/dificultad/${id}`);
                setDificultades(dificultades.filter(dificultad => dificultad.id !== id));
                console.log('Dificultad eliminada exitosamente');
            } catch (error) {
                console.error('Error al eliminar dificultad:', error.message);
                setError('Error al eliminar dificultad. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Dificultades</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="text-end mb-3">
                            <Link to="/dificultad" className="btn btn-success">Nueva Dificultad</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dificultades.map(dificultad => (
                                    <tr key={dificultad.id}>
                                        <td>{dificultad.name_category}</td>
                                        <td>{dificultad.descripcion}</td>
                                        <td>
                                            <Link to={`/dificultad/edit/${dificultad.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarDificultad(dificultad.id)}>Eliminar</button>
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

export default ViewDificultadNivel;
