import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const PostAprobacion = () => {
    const [aprobacionData, setAprobacionData] = useState({
        id_bossApprobation: '',
        date_approbation: '',
        descriptionApprobation: '',
        restrictionApprobation: ''
    });
    const [usuarios, setUsuarios] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuarios();
    }, []);

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
            await axios.post('http://localhost:3001/aprobaciones', aprobacionData);
            console.log('Aprobación creada exitosamente');
            setConfirmacion(true);
            setAprobacionData({
                id_bossApprobation: '',
                date_approbation: '',
                descriptionApprobation: '',
                restrictionApprobation: ''
            });
        } catch (error) {
            console.error('Error al crear aprobación:', error.message);
            setError('Error al crear aprobación. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Aprobación</h2>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_bossApprobation"
                                    value={aprobacionData.id_bossApprobation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Usuario</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date_approbation"
                                    value={aprobacionData.date_approbation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descriptionApprobation"
                                    value={aprobacionData.descriptionApprobation}
                                    onChange={handleChange}
                                    placeholder="Descripción de la Aprobación"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="restrictionApprobation"
                                    value={aprobacionData.restrictionApprobation}
                                    onChange={handleChange}
                                    placeholder="Restricción de la Aprobación"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Aprobación creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostAprobacion;
