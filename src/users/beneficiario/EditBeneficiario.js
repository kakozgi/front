import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditBeneficiario = () => {
    const { id } = useParams();

    const [beneficiarioData, setBeneficiarioData] = useState({
        name_beneficiario: '',
        age: '',
        rut: '',
        sexo: '',
        id_proyect: ''
    });

    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState(false);

    useEffect(() => {
        cargarBeneficiario();
        cargarProyectos();
        // eslint-disable-next-line
    }, [id]);

    const cargarBeneficiario = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/beneficiarios/${id}`);
            setBeneficiarioData(response.data);
        } catch (error) {
            console.error('Error al cargar beneficiario:', error.message);
            setError('Error al cargar beneficiario. Inténtalo de nuevo más tarde.');
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
        setBeneficiarioData({ ...beneficiarioData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/beneficiarios/${id}`, beneficiarioData);
            console.log('Beneficiario actualizado exitosamente');
            setConfirmacion(true);
            setTimeout(() => {
                window.location=('/beneficiarios/view'); // Redirigir a la lista de beneficiarios después de un corto retraso
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar beneficiario:', error.message);
            setError('Error al actualizar beneficiario. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Editar Beneficiario</h2>
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
                                    name="name_beneficiario"
                                    value={beneficiarioData.name_beneficiario}
                                    onChange={handleChange}
                                    placeholder="Nombre del Beneficiario"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={beneficiarioData.age}
                                    onChange={handleChange}
                                    placeholder="Edad"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rut"
                                    value={beneficiarioData.rut}
                                    onChange={handleChange}
                                    placeholder="RUT"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="sexo"
                                    value={beneficiarioData.sexo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Sexo</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="id_proyect"
                                    value={beneficiarioData.id_proyect}
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
                                    ¡Beneficiario actualizado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBeneficiario;
