import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const PostFinanciamientoFuente = () => {
    const [financiamientoData, setFinanciamientoData] = useState({
        name_financiamiento_fuente: '',
        monto: '',
        id_proyecto: '',
    });
    const [proyectos, setProyectos] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProyectos();
    }, []);
    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
            setProyectos(response.data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
            setError('Error al cargar proyectos. Inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFinanciamientoData({ ...financiamientoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/fuenteFinanciamiento', financiamientoData);
            console.log('Fuente de financiamiento creada exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                setConfirmacion(false);
            }, 2000);
        } catch (error) {
            console.error('Error al crear fuente de financiamiento:', error.message);
            setError('Error al crear fuente de financiamiento. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Fuente de Financiamiento</h2>
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
                                    name="name_financiamiento_fuente"
                                    value={financiamientoData.name_financiamiento_fuente}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Fuente de Financiamiento"
                                    required
                                />
                            </div>
                            <div className="mb-3 input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="monto"
                                    value={financiamientoData.monto}
                                    onChange={handleChange}
                                    placeholder="Monto"
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyecto"
                                    value={financiamientoData.id_proyecto}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>
                                            {proyecto.name_proyect}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
                            </div>
                            {confirmacion && (
                                <div className="alert alert-success" role="alert">
                                    ¡Fuente de financiamiento creada exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostFinanciamientoFuente;
