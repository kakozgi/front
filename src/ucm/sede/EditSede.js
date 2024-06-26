import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarSede = () => {
    const { id } = useParams();
    const [sede, setSede] = useState({
        name_headquarter: '',
    });

    useEffect(() => {
        cargarSede();
        // eslint-disable-next-line
    }, []);

    const cargarSede = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/sede/${id}`); 
            setSede(response.data);
        } catch (error) {
            console.error('Error al cargar la sede:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSede({ ...sede, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/sede/${id}`, sede);
                console.log('Sede actualizada exitosamente');
                window.location = '/sede/view';
            } catch (error) {
                console.error('Error al actualizar la sede:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Sede</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_headquarter"
                                    value={sede.name_headquarter}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Sede"
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

export default EditarSede;
