import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const EditAlineamiento = () => {
    const { id } = useParams();
    const [alineamientoData, setAlineamientoData] = useState({
        name_alineamiento: '',
        resultadoProyecto: ''
    });
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);

    useEffect(() => {
        cargarAlineamiento();

         // eslint-disable-next-line
    }, [id]);

    const cargarAlineamiento = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/alineamiento/${id}`);
            setAlineamientoData(response.data);
        } catch (error) {
            console.error('Error al cargar alineamiento:', error.message);
            setError('Error al cargar el alineamiento. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlineamientoData({ ...alineamientoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/alineamiento/${id}`, alineamientoData);
            console.log('Alineamiento actualizado exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                window.location = '/alineamiento/view';
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar alineamiento:', error.message);
            setError('Error al actualizar el alineamiento. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Alineamiento</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_alineamiento"
                                    value={alineamientoData.name_alineamiento}
                                    onChange={handleChange}
                                    placeholder="Nombre del Alineamiento"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="resultadoProyecto"
                                    value={alineamientoData.resultadoProyecto}
                                    onChange={handleChange}
                                    placeholder="Resultado del Proyecto"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Alineamiento actualizado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAlineamiento;
