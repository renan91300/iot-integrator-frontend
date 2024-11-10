import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { fetchCategories, fetchLocations, createProject } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import StepIndicator from "../components/steps";
import handleJsonChange from "../components/utils/handleJsonChange";
import handleChange from "../components/utils/handleChange";

const FormDispositivo = () => {
    const [inputs, setInputs] = useState({
        id: null,
        name: '',
        base_settings: '',
        project: null
    });
    // const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId");

    const deviceId = useParams().id;

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleStepClick = (index) => {
        setStep(index + 1); // Ajuste para exibir o passo correto
    };

    const localHandleJsonChange = (event) => {
        handleJsonChange(event, inputs, setInputs, setError);
    }

    const localHandleChange = (event) => {
        handleChange(event, inputs, setInputs);
    }

    function loadCategories() {
        fetchCategories(localProjectId)
            .then((res) => {
                setCategories(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Algo deu errado ao buscar as categorias');
            });
    }

    function loadLocations() {
        fetchLocations(localProjectId)
            .then((res) => {
                setLocations(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Algo deu errado ao buscar as localizações');
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
        if (categoryId) {
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
        setInputs({ ...inputs, id: deviceId, project: localProjectId });
        if (deviceId) {
            // loadCategoryById(categoryId);
        }
        loadCategories();
        loadLocations();
    }, [deviceId]);

    return (
        <>
            <ToastContainer />
            {loading && <div>Carregando...</div>}
            <h1>{deviceId ? "Editar" : "Adicionar"} um novo dispositivo</h1>
            <hr style={{ width: "45vw" }}></hr>
            <div className="">
                <StepIndicator currentStep={step - 1} totalSteps={totalSteps} onStepClick={handleStepClick} />
                {step === 1 && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-floating col-6 offset-3">
                            <Form.Control autoFocus type="text" name="name" value={inputs?.name} onChange={localHandleChange} placeholder="Digite o nome do dispositivo" />
                            <Form.Label>Nome do dispositivo</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="category" className="form-floating col-6 offset-3 mt-3">
                            <Form.Select>
                                <option>Selecione uma categoria</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="offset-3">
                            <Button onClick={nextStep} className="mt-3">
                                Próximo
                            </Button>
                        </div>
                    </Form>
                )}
                {step === 2 && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-floating col-6 offset-3">
                            <Form.Control autoFocus type="text" name="name" value={inputs?.name} onChange={localHandleChange} placeholder="Digite o nome do dispositivo" />
                            <Form.Label>Campos</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="category" className="form-floating col-6 offset-3 mt-3">
                            <Form.Select>
                                <option>Selecione uma categoria</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="offset-3">
                            <Button onClick={nextStep} className="mt-3">
                                Próximo
                            </Button>
                        </div>
                    </Form>
                )}

            </div>
        </>
    );
}

export default FormDispositivo