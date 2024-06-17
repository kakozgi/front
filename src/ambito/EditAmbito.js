import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import Inicio from '../inicionav/nav';

const EditAmbito = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [ambito, setAmbito] = useState({
        name_ambit: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAmbito();
        // eslint-disable-next-line
    }, []);

    const cargarAmbito = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ambito/${id}`);
            setAmbito(response.data);
        } catch (error) {
            console.error('Error al cargar ámbito:', error.message);
            setError('Error al cargar el ámbito. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAmbito({ ...ambito, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/ambito/${id}`, ambito);
                console.log('Ámbito actualizado exitosamente');
                window.location = '/ambito/view'; // Redirige a la vista de ámbitos después de la actualización
            } catch (error) {
                console.error('Error al actualizar el ámbito:', error.message);
                setError('Error al actualizar el ámbito. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="text-center mb-4">Editar Ámbito</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_ambit"
                                    value={ambito.name_ambit}
                                    onChange={handleChange}
                                    placeholder="Nombre del Ámbito"
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

export default EditAmbito;
