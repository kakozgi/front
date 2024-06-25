import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams} from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditRegion = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [nombreRegion, setNombreRegion] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRegion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cargarRegion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/region/${id}`);
            setNombreRegion(response.data.name_region);
        } catch (error) {
            console.error('Error al cargar la región:', error.message);
            setError('Error al cargar la región. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        setNombreRegion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/region/${id}`, { name_region: nombreRegion });
            console.log('Región actualizada exitosamente');
            window.location = '/region/view' // Redirige a la vista de regiones después de actualizar la región
        } catch (error) {
            console.error('Error al actualizar la región:', error.message);
            setError('Error al actualizar la región. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Editar Región</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_region"
                                    value={nombreRegion}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Región"
                                />
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

export default EditRegion;
