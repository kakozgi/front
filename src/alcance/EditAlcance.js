import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarAlcance = () => {
    const { id } = useParams(); // Obtener el parámetro de la URL
    const [alcance, setAlcance] = useState({
        name_scope: '',
    });

    useEffect(() => {
        cargarAlcance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cargarAlcance = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/alcance/${id}`);
            setAlcance(response.data);
        } catch (error) {
            console.error('Error al cargar alcance:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlcance({ ...alcance, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/alcance/${id}`, alcance);
                console.log('Alcance actualizado exitosamente');
                window.location = '/alcance/view'; // Redirigir a la vista de alcances después de la edición
            } catch (error) {
                console.error('Error al actualizar el alcance:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Alcance</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_scope"
                                    value={alcance.name_scope}
                                    onChange={handleChange}
                                    placeholder="Nombre del Alcance"
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

export default EditarAlcance;
