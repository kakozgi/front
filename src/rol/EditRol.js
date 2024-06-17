import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../inicionav/nav';

const EditarRol = () => {
    const { id } = useParams();
    const [rol, setRol] = useState({
        name_role: '',
    });

    useEffect(() => {
        cargarRol();
        // eslint-disable-next-line
    }, []);

    const cargarRol = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/rol/${id}`); 
            setRol(response.data);
        } catch (error) {
            console.error('Error al cargar el Rol:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRol({ ...rol, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            try {
                await axios.put(`http://localhost:3001/rol/${id}`, rol);
                console.log('Rol actualizada exitosamente');
                window.location = '/rol/view';
            } catch (error) {
                console.error('Error al actualizar el Rol:', error.message);
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Rol</h2>
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_role"
                                    value={rol.name_role}
                                    onChange={handleChange}
                                    placeholder="Nombre Rol"
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

export default EditarRol;
