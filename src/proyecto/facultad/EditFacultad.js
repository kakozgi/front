import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';
import axios from '../../axiosInstance';

const EditarFacultad = () => {
    const { id } = useParams();
    const [facultad, setFacultad] = useState({
        name_facultie: '',
    });

    useEffect(() => {
        cargarFacultad();
        // eslint-disable-next-line
    }, []);

    const cargarFacultad = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/facultad/${id}`); 
            setFacultad(response.data);
        } catch (error) {
            console.error('Error al cargar la facultad:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacultad({ ...facultad, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/facultad/${id}`, facultad);
                console.log('Facultad actualizada exitosamente');
                window.location = '/facultad/view';
            } catch (error) {
                console.error('Error al actualizar la facultad:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Facultad</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_facultie"
                                    value={facultad.name_facultie}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Facultad"
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

export default EditarFacultad;
