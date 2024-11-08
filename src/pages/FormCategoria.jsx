import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { createCategory, deleteCategory, fetchCategoryById, updateCategory } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import handleJsonChange from "../components/utils/handleJsonChange";
import handleChange from "../components/utils/handleChange";

const FormCategoria = () => {
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

    // const localProjectId = sessionStorage.getItem("localProjectId");
    const localProjectId = 1; // MOCK - Remover quando implementar projetos

    const idCategory = useParams().id;

    const localHandleJsonChange = (event) => {
        handleJsonChange(event, inputs, setInputs, setError);
    }

    const localHandleChange = (event) => {
        handleChange(event, inputs, setInputs);
    }

    function loadCategoryById(idCategory) {
        setLoading(true);
        fetchCategoryById(idCategory, localProjectId)
            .then((response) => {
                setInputs({ ...inputs, id: idCategory, project: localProjectId, name: response.name, base_settings: JSON.stringify(response.base_settings, null, 2) });
            })
            .catch((err) => {
                console.log(err);
                toast.error('Algo deu errado ao carregar a categoria');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (error) {
            setError('JSON inválido. Verifique a sintaxe.');
            return;
        }
        
        const data = {
            id: inputs?.id,
            name: inputs?.name,
            base_settings: JSON.parse(inputs?.base_settings),
            project: inputs?.project
        }
        if (idCategory) {
            // Update
            updateCategory(data)
                .then(() => {
                    navigate("/categorias");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Algo deu errado ao salvar a categoria');
                });
            return;
        }
        else {
            createCategory(data)
                .then(() => {
                    navigate("/categorias");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Algo deu errado ao salvar a categoria');
                });
        }
    }

    useEffect(() => {
        setInputs({ ...inputs, id: idCategory, project: localProjectId });
        if (idCategory) {
            loadCategoryById(idCategory);
        }
    }, [idCategory]);

    return (
        <>
            <ToastContainer />
            {loading && <div>Carregando...</div>}
            <h1>{idCategory ? "Editar" : "Adicionar"} uma nova categoria</h1>
            <hr style={{ width: "45vw" }}></hr>
            <div className="">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating col-6">
                        <Form.Control type="text" name="name" value={inputs?.name} onChange={localHandleChange} placeholder="Digite o nome da categoria" />
                        <Form.Label>Nome da categoria</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating col-6 mt-3">
                        <Form.Control
                            as="textarea"
                            name="base_settings"
                            value={inputs?.base_settings}
                            onChange={localHandleJsonChange}
                            rows={10}
                            placeholder="Digite seu JSON aqui..."
                            isInvalid={!!error && inputs?.base_settings}
                            style={{ width: '100%', minHeight: '300px' }}
                        />
                        {(error && inputs?.base_settings) && (
                            <div className="invalid-feedback">{error}</div>
                        )}
                        <Form.Label>Configuração Base</Form.Label>
                    </Form.Group>
                    <div>
                        <Button className="btn btn-danger" style={{ width: "150px" }} onClick={() => navigate("/categorias")}>Cancelar</Button>
                        <Button className="btn btn-success m-3" style={{ width: "150px" }} type="submit">Salvar</Button>
                    </div>
                </Form>

            </div>
        </>
    );
}

export default FormCategoria