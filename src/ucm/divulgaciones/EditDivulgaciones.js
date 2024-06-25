import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { useParams } from 'react-router-dom';

const EditarDivulgacion = () => {
    const { id } = useParams(); // Obtiene el parámetro de la ruta
  
    
    const [formValues, setFormValues] = useState({
        name_divulgacion: '',
        id_proyecto: ''
    });
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDivulgacion();
        cargarProyectos();
        
// eslint-disable-next-line
    }, []);


    const cargarDivulgacion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/divulgacion/${id}`); // Endpoint para obtener la divulgación por su rut
            setFormValues({
                name_divulgacion: response.data.name_divulgacion,
                id_proyecto: response.data.id_proyecto.toString() // Asegúrate de convertir id_proyecto a string si es necesario
            });
        } catch (error) {
            setError('Error al cargar la divulgación');
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/proyecto');
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
            await axios.put(`http://localhost:3001/divulgacion/${id}`, formValues); // Endpoint para actualizar la divulgación por su rut
            window.location = ('/divulgaciones'); // Redirige a la lista de divulgaciones después de editar
        } catch (error) {
            setError('Error al editar la divulgación');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Divulgación</h2>
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
                                <button type="submit" className="btn btn-primary px-5">Guardar Cambios</button>
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

export default EditarDivulgacion;
