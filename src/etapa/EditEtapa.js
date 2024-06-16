import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarEtapa = () => {
    const { id } = useParams();
    const [etapa, setEtapa] = useState({
        name_stage: '',
    });

    useEffect(() => {
        cargarEtapa();
        // eslint-disable-next-line
    }, []);

    const cargarEtapa = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/etapa/${id}`);
            setEtapa(response.data);
        } catch (error) {
            console.error('Error al cargar etapa:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEtapa({ ...etapa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/etapa/${id}`, etapa);
                console.log('Etapa actualizada exitosamente');
                window.location = '/etapa/view';
            } catch (error) {
                console.error('Error al actualizar la etapa:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Etapa</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_stage"
                                    value={etapa.name_stage}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Etapa"
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

export default EditarEtapa;
