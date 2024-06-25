import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearDivulgacion = () => {
    const [formValues, setFormValues] = useState({
        name_divulgacion: '',
        id_proyecto: ''
    });

    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto'); // Ajusta la URL según tu backend
            setProyectos(response.data);
        } catch (error) {
            setError('Error al cargar los proyectos');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/divulgacion', formValues); // Ajusta la URL según tu backend
            console.log('Divulgación creada exitosamente:', response.data);
            // Lógica adicional después de crear la divulgación, por ejemplo, redireccionar o limpiar el formulario
            setFormValues({
                name_divulgacion: '',
                id_proyecto: ''
            });
        } catch (error) {
            setError('Error al crear la divulgación');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Nueva Divulgación</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_divulgacion"
                                    value={formValues.name_divulgacion}
                                    onChange={handleChange}
                                    placeholder="Nombre de la Divulgación"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyecto"
                                    value={formValues.id_proyecto}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un Proyecto</option>
                                    {proyectos.map(proyecto => (
                                        <option key={proyecto.id} value={proyecto.id}>{proyecto.name_proyect}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5">Guardar</button>
                            </div>
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearDivulgacion;
