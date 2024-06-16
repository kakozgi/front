import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarModalidad = () => {
    const { id } = useParams();
    const [modalidad, setModalidad] = useState({
        name_modality: '',
    });

    useEffect(() => {
        cargarModalidad();
        // eslint-disable-next-line
    }, []);

    const cargarModalidad = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/modalidad/${id}`); 
            setModalidad(response.data);
        } catch (error) {
            console.error('Error al cargar modalidad:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalidad({ ...modalidad, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/modalidad/${id}`, modalidad);
                console.log('Modalidad actualizada exitosamente');
                window.location = '/modalidad/view';
            } catch (error) {
                console.error('Error al actualizar la modalidad:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Modalidad</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_modality"
                                    value={modalidad.name_modality}
                                    onChange={handleChange}
                                    placeholder="Nombre Modalidad"
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

export default EditarModalidad;
