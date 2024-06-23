import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosInstance';
import Inicio from '../inicionav/nav';

const EditAprobacion = () => {
    const { id } = useParams();
    const [aprobacionData, setAprobacionData] = useState({
        id_bossApprobation: '',
        date_approbation: '',
        descriptionApprobation: '',
        restrictionApprobation: '',
    });
    const [usuarios, setUsuarios] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAprobacion();
        cargarUsuarios();

         // eslint-disable-next-line
    }, []);

    const cargarAprobacion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/aprobaciones/${id}`);
            const { id_bossApprobation, date_approbation, descriptionApprobation, restrictionApprobation } = response.data;
            setAprobacionData({
                id_bossApprobation,
                date_approbation: new Date(date_approbation).toISOString().split('T')[0],
                descriptionApprobation,
                restrictionApprobation,
            });
        } catch (error) {
            console.error('Error al cargar la aprobación:', error.message);
            setError('Error al cargar la aprobación. Inténtalo de nuevo más tarde.');
        }
    };

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuario');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error.message);
            setError('Error al cargar usuarios. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAprobacionData({ ...aprobacionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/aprobaciones/${id}`, aprobacionData);
            console.log('Aprobación actualizada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
                window.location = '/aprobaciones/view';
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar la aprobación:', error.message);
            setError('Error al actualizar la aprobación. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Aprobación</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Responsable</label>
                                <select
                                    className="form-control"
                                    name="id_bossApprobation"
                                    value={aprobacionData.id_bossApprobation}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar responsable</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de Aprobación</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date_approbation"
                                    value={aprobacionData.date_approbation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    name="descriptionApprobation"
                                    value={aprobacionData.descriptionApprobation}
                                    onChange={handleChange}
                                    placeholder="Descripción de la aprobación"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Restricciones</label>
                                <textarea
                                    className="form-control"
                                    name="restrictionApprobation"
                                    value={aprobacionData.restrictionApprobation}
                                    onChange={handleChange}
                                    placeholder="Restricciones de la aprobación"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Aprobación actualizada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAprobacion;
