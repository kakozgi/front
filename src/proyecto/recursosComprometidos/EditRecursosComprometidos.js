import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditRecursosComprometidos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recursoData, setRecursoData] = useState({
        name_recurso: '',
        monto: '',
        id_proyecto: ''
    });
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarRecurso();
        cargarProyectos();

        // eslint-disable-next-line 
    }, [id]);

    const cargarRecurso = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/recursosComprometidos/${id}`);
            setRecursoData({
                name_recurso: response.data.name_recurso,
                monto: response.data.monto,
                id_proyecto: response.data.id_proyecto
            });
        } catch (error) {
            console.error('Error al cargar el recurso:', error.message);
            setError('Error al cargar el recurso. Inténtalo de nuevo más tarde.');
        }
    };

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
        setRecursoData({ ...recursoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/recursosComprometidos/${id}`, recursoData);
            console.log('Recurso actualizado exitosamente');
            navigate('/recursosComprometidos');
        } catch (error) {
            console.error('Error al actualizar recurso:', error.message);
            setError('Error al actualizar recurso. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Recurso Comprometido</h2>
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
                                    name="name_recurso"
                                    value={recursoData.name_recurso}
                                    onChange={handleChange}
                                    placeholder="Nombre del Recurso"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="monto"
                                    value={recursoData.monto}
                                    onChange={handleChange}
                                    placeholder="Monto"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    name="id_proyecto"
                                    value={recursoData.id_proyecto}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un Proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>
                                            {proyecto.name_proyect}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRecursosComprometidos;
