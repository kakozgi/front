import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarComuna = () => {
    const { id } = useParams();
    const [comuna, setComuna] = useState({
        name_commune: '',
    });

    useEffect(() => {
        cargarComuna();
        // eslint-disable-next-line
    }, []);

    const cargarComuna = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/comuna/${id}`);
            setComuna(response.data);
        } catch (error) {
            console.error('Error al cargar comuna:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComuna({ ...comuna, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/comuna/${id}`, comuna);
                console.log('Comuna actualizada exitosamente');
                window.location = '/comuna/view';
            } catch (error) {
                console.error('Error al actualizar la comuna:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Comuna</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_commune"
                                    value={comuna.name_commune}
                                    onChange={handleChange}
                                    placeholder="Nombre Comuna"
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

export default EditarComuna;
