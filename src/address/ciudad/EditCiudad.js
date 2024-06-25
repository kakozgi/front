import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarCiudad = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [nombreCiudad, setNombreCiudad] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        cargarCiudad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cargarCiudad = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ciudad/${id}`);
            setNombreCiudad(response.data.name_city);
      
        } catch (error) {
            console.error('Error al cargar la ciudad:', error.message);
            setError('Error al cargar la ciudad. Inténtalo de nuevo más tarde.');

        }
    };

    const handleChange = (e) => {
        setNombreCiudad(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/ciudad/${id}`, { name_city: nombreCiudad });
                console.log('Ciudad actualizada exitosamente');
                window.location = '/ciudad/view'; // Redirige a la vista de ciudades después de la actualización
            } catch (error) {
                console.error('Error al actualizar la ciudad:', error.message);
                setError('Error al actualizar la ciudad. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Editar Ciudad</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    id="nombreCiudad"
                                    className="form-control"
                                    value={nombreCiudad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarCiudad;
