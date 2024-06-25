import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import Inicio from '../../inicionav/nav';

const EditRiesgo = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [riesgo, setRiesgo] = useState({
        nameRiesgoAsociado: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRiesgo();
        // eslint-disable-next-line
    }, []);

    const cargarRiesgo = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/riesgo/${id}`);
            setRiesgo(response.data);
        } catch (error) {
            console.error('Error al cargar riesgo:', error.message);
            setError('Error al cargar el riesgo. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRiesgo({ ...riesgo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/riesgo/${id}`, riesgo);
                console.log('Riesgo actualizado exitosamente');
                window.location = '/riesgo/view'; // Redirige a la vista de riesgos después de la actualización
            } catch (error) {
                console.error('Error al actualizar el riesgo:', error.message);
                setError('Error al actualizar el riesgo. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Editar Riesgo</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nameRiesgoAsociado"
                                    value={riesgo.nameRiesgoAsociado}
                                    onChange={handleChange}
                                    placeholder="Nombre del Riesgo Asociado"
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

export default EditRiesgo;
