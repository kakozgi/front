import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CreateAlineamiento = () => {
    const [alineamientoData, setAlineamientoData] = useState({
        name_alineamiento: '',
        resultadoProyecto: '',
    });
    const [confirmacion, setConfirmacion] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlineamientoData({ ...alineamientoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/alineamiento', alineamientoData);
            console.log('Alineamiento creado exitosamente');
            setConfirmacion(true);

            setAlineamientoData({
                name_alineamiento: '',
                resultadoProyecto: '',
            });
        } catch (error) {
            console.error('Error al crear alineamiento:', error.message);
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Crear Alineamiento</h2>
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
                                    ¡Alineamiento creado exitosamente!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default CreateAlineamiento;
