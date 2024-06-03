import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarArea = () => {
    const { id } = useParams();
    const [area, setArea] = useState({
        name_area: '',
    });

    useEffect(() => {
        cargarArea();
        // eslint-disable-next-line
    }, []);

    const cargarArea = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/area/${id}`); 
            setArea(response.data);
        } catch (error) {
            console.error('Error al cargar la facultad:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArea({ ...area, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/area/${id}`, area);
                console.log('Area actualizada exitosamente');
                window.location = '/Area/view';
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
                        <h2 className="text-center">Editar Area</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_area"
                                    value={area.name_area}
                                    onChange={handleChange}
                                    placeholder="Nombre Area"
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

export default EditarArea;
