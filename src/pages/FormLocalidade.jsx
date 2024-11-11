import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { createLocation, fetchLocationById, updateLocation } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import handleJsonChange from "../components/utils/handleJsonChange";
import handleChange from "../components/utils/handleChange";

const FormLocalidade = () => {
    const [inputs, setInputs] = useState({
        id: null,
        name: '',
        base_settings: '',
        project: null
    });
    // const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId");

    const locationId = useParams().id;

    const localHandleChange = (event) => {
        handleChange(event, inputs, setInputs);
    }

    function loadLocationById(locationId) {
        setLoading(true);
        fetchLocationById(locationId, localProjectId)
            .then((response) => {
                setInputs({ ...inputs, id: locationId, project: localProjectId, name: response.name, block: response.block, floor: response.floor});
            })
            .catch((err) => {
                console.log(err);
                toast.error('Algo deu errado ao carregar a localidade');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            id: inputs?.id,
            name: inputs?.name,
            block: inputs?.block,
            floor: inputs?.floor,
            project: inputs?.project
        }
        if (locationId) {
            // Update
            updateLocation(data)
                .then(() => {
                    navigate("/localidades");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Algo deu errado ao salvar a localidade');
                });
            return;
        }
        else {
            createLocation(data)
                .then(() => {
                    navigate("/localidades");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Algo deu errado ao salvar a localidade');
                });
        }
    }

    useEffect(() => {
        setInputs({ ...inputs, id: locationId, project: localProjectId });
        if (locationId) {
            loadLocationById(locationId);
        }
    }, [locationId]);

    return (
        <>
            <ToastContainer />
            {loading && <div>Carregando...</div>}
            <h1>{locationId ? "Editar" : "Adicionar"} uma nova localidade</h1>
            <hr style={{ width: "45vw" }}></hr>
            <div className="">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating col-6">
                        <Form.Control type="text" autoFocus name="name" value={inputs?.name} onChange={localHandleChange} placeholder="Digite o nome da localidade" />
                        <Form.Label>Nome da localidade</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating col-6 mt-3">
                        <Form.Control type="text" name="block" value={inputs?.block} onChange={localHandleChange} placeholder="Digite o bloco da localidade" />
                        <Form.Label>Bloco</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating col-6 mt-3">
                        <Form.Control type="text" name="floor" value={inputs?.floor} onChange={localHandleChange} placeholder="Digite o andar da localidade" />
                        <Form.Label>Andar</Form.Label>
                    </Form.Group>
                    <div>
                        <Button className="btn btn-danger" style={{ width: "150px" }} onClick={() => navigate("/localidades")}>Cancelar</Button>
                        <Button className="btn btn-success m-3" style={{ width: "150px" }} type="submit">Salvar</Button>
                    </div>
                </Form>

            </div>
        </>
    );
}

export default FormLocalidade