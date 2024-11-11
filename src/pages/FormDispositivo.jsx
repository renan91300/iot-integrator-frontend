import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { fetchCategories, fetchLocations, createProject, createDevice } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import StepIndicator from "../components/steps";
import handleJsonChange from "../components/utils/handleJsonChange";
import handleChange from "../components/utils/handleChange";
import "./FormDispositivo.css";

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
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [fieldCarouselIndex, setFieldCarouselIndex] = useState(0); // Índice do campo atual no "carousel"
    const [fieldCount, setFieldCount] = useState(0); // Número de campos a serem preenchidos
    const [deviceFields, setDeviceFields] = useState([]);
    const totalSteps = 4;
    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId");

    const deviceId = useParams().id;

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Funções para navegação do "carousel" de campos
    const nextField = () => setFieldCarouselIndex((prev) => Math.min(prev + 1, fieldCount - 1));
    const prevField = () => setFieldCarouselIndex((prev) => Math.max(prev - 1, 0));

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

    function handleSelectChange(event) {
        setSelectedCategoryIndex(event.target.value);
        if (event.target.value === "0") {
            setInputs({ ...inputs, config: '', category: '' });
            return;
        }
        setInputs({ ...inputs, config: JSON.stringify(categories[event.target.value - 1].base_settings, null, 2), category: categories[event.target.value - 1].id });
    }

    const handleFieldCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setFieldCount(count);

        // Gerar uma nova lista de campos para cada campo a ser preenchido
        const newFields = Array.from({ length: count }, () => ({ name: '', field_type: '', format: '', topic: '', visual_type: '' }));
        setDeviceFields(newFields);

        setFieldCarouselIndex(0); // Reiniciar o índice do carousel
    };

    const handleDeviceFieldChange = (index, field, value) => {
        const updatedFields = [...deviceFields];
        updatedFields[index][field] = value;
        setDeviceFields(updatedFields);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (error) {
            setError('JSON inválido. Verifique a sintaxe.');
            return;
        }

        const status = {
            field_name: inputs?.status_name,
            field_type: inputs?.status_type,
            field_possible_values: inputs?.status_type === 'switch' ? [inputs?.status_off, inputs?.status_on] : [inputs?.status_min, inputs?.status_max],
            field_value: null
        }

        const data = {
            id: inputs?.id,
            name: inputs?.name,
            category_id: inputs?.category,
            location_id: inputs?.location,
            config: JSON.parse(inputs?.config),
            status: status,
            received_data_config: deviceFields,
            project: inputs?.project
        }
        createDevice(data)
            .then(() => {
                navigate("/dispositivos");
            })
            .catch((err) => {
                console.log(err);
                toast.error('Algo deu errado ao criar o dispositivo');
            });

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
                        <Form.Group className="col-6 offset-3">
                            <Form.Label>Nome do dispositivo</Form.Label>
                            <Form.Control autoFocus type="text" name="name" value={inputs?.name} onChange={localHandleChange} placeholder="Digite o nome do dispositivo" />
                        </Form.Group>
                        <Form.Group className="col-6 offset-3 mt-3">
                            <Form.Label>Localização</Form.Label>
                            <Form.Select name="location" value={inputs?.location} onChange={localHandleChange}>
                                <option>Selecione uma localização...</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location.id}>{location.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-6 offset-3 mt-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select value={selectedCategoryIndex} onChange={(e) => handleSelectChange(e)}>
                                <option value="0">Selecione uma categoria...</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={index + 1}>{category.name}</option>
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
                        <Form.Group className="form-floating col-6 offset-3 mt-3">
                            <Form.Control
                                as="textarea"
                                name="config"
                                value={inputs?.config}
                                onChange={localHandleJsonChange}
                                disabled={selectedCategoryIndex == "0"}
                                rows={10}
                                placeholder="Digite seu JSON aqui..."
                                isInvalid={!!error && inputs?.config}
                                style={{ width: '100%', minHeight: '300px' }}
                            />
                            {(error && inputs?.config) && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                            <Form.Label>Configuração (Base carregada da categoria selecionada)</Form.Label>
                        </Form.Group>
                        <div className="offset-3">
                            <Button onClick={prevStep} className="mt-3" style={{ marginRight: '20px' }}>
                                Anterior
                            </Button>
                            <Button onClick={nextStep} className="mt-3">
                                Próximo
                            </Button>
                        </div>
                    </Form>
                )}
                {step === 3 && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="col-6 offset-3 mt-3">
                            <Form.Label>O dispositivo faz controle de estado? (Exemplo: Ligado/Desligado; Potência)</Form.Label>
                            <Form.Check type="checkbox">
                                <Form.Check.Input type="checkbox" name="status_check" id="status_check" value={inputs?.status_check} onChange={localHandleChange} />
                                <Form.Check.Label htmlFor="status_check">Sim</Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                        {inputs?.status_check && (
                            <>

                                <Form.Group className="col-6 offset-3 mt-3">
                                    <Form.Label>Nome do estado</Form.Label>
                                    <Form.Control type="text" name="status_name" value={inputs?.status_name} onChange={localHandleChange} placeholder="Ex.: Ligado?" />
                                </Form.Group>
                                <Form.Group className="col-6 offset-3 mt-3">
                                    <Form.Label>Tipo (interruptor ou controle deslizante)</Form.Label>
                                    <Form.Select name="status_type" value={inputs?.status_type} onChange={localHandleChange}>
                                        <option>Selecione um tipo</option>
                                        <option value="switch">Interruptor</option>
                                        <option value="slider">Controle deslizante</option>
                                    </Form.Select>
                                </Form.Group>
                                {inputs?.status_type === 'slider' && (
                                    <>
                                        <Form.Group className="col-6 offset-3 mt-3">
                                            <Form.Label>Valor mínimo</Form.Label>
                                            <Form.Control type="number" name="status_min" value={inputs?.status_min} onChange={localHandleChange} />
                                        </Form.Group>
                                        <Form.Group className="col-6 offset-3 mt-3">
                                            <Form.Label>Valor máximo</Form.Label>
                                            <Form.Control type="number" name="status_max" value={inputs?.status_max} onChange={localHandleChange} />
                                        </Form.Group>
                                    </>
                                )}
                                {inputs?.status_type === 'switch' && (
                                    <>
                                        <Form.Group className="col-6 offset-3 mt-3">
                                            <Form.Label>Valor para ligado</Form.Label>
                                            <Form.Control type="text" name="status_on" value={inputs?.status_on} onChange={localHandleChange} />
                                        </Form.Group>
                                        <Form.Group className="col-6 offset-3 mt-3">
                                            <Form.Label>Valor para desligado</Form.Label>
                                            <Form.Control type="text" name="status_off" value={inputs?.status_off} onChange={localHandleChange} />
                                        </Form.Group>
                                    </>
                                )}
                            </>
                        )}

                        <div className="offset-3">
                            <Button onClick={prevStep} className="mt-3" style={{ marginRight: '20px' }}>
                                Anterior
                            </Button>
                            <Button onClick={nextStep} className="mt-3">
                                Próximo
                            </Button>
                        </div>
                    </Form>
                )}
                {step === 4 && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="col-6 offset-3 mt-3">
                            <Form.Label>Quantos campos (dados) o dispositivo enviará para a plataforma?</Form.Label>
                            <Form.Control type="number" value={fieldCount} min={0} onChange={handleFieldCountChange} />
                        </Form.Group>
                        {fieldCount > 0 && (
                            <div className="col-6 offset-3 mt-3 carousel-field-group">
                                <h5>Campo {fieldCarouselIndex + 1}</h5>
                                <Form.Group className="mt-3" controlId={`fieldName${fieldCarouselIndex}`}>
                                    <Form.Label>Nome do campo</Form.Label>
                                    <Form.Control type="text" value={deviceFields[fieldCarouselIndex].name} onChange={(e) => handleDeviceFieldChange(fieldCarouselIndex, 'name', e.target.value)} placeholder="Ex.: Temperatura" />
                                </Form.Group>
                                <Form.Group className="mt-3" controlId={`fieldType${fieldCarouselIndex}`}>
                                    <Form.Label>Tipo do campo</Form.Label>
                                    <Form.Select value={deviceFields[fieldCarouselIndex].field_type} onChange={(e) => handleDeviceFieldChange(fieldCarouselIndex, 'field_type', e.target.value)}>
                                        <option>Selecione um tipo</option>
                                        <option value="number">Número</option>
                                        <option value="text">Texto</option>
                                        <option value="multivalue">Múltiplos Valores (Objeto/Dicionário)</option>
                                    </Form.Select>
                                </Form.Group>
                                {deviceFields[fieldCarouselIndex].field_type === 'number' && (
                                    <Form.Group className="mt-3" controlId={`fieldFormat${fieldCarouselIndex}`}>
                                        <Form.Label>Formato / Unidade</Form.Label>
                                        <Form.Control type="text" value={deviceFields[fieldCarouselIndex].format} onChange={(e) => handleDeviceFieldChange(fieldCarouselIndex, 'format', e.target.value)} placeholder="Ex.: %, °C " />
                                    </Form.Group>
                                )}
                                <Form.Group className="mt-3" controlId={`fieldTopic${fieldCarouselIndex}`}>
                                    <Form.Label>Tópico MQTT</Form.Label>
                                    <Form.Control type="text" value={deviceFields[fieldCarouselIndex].topic} onChange={(e) => handleDeviceFieldChange(fieldCarouselIndex, 'topic', e.target.value)} placeholder="device2/data/temperature" />
                                </Form.Group>
                                <Form.Group className="mt-3" controlId={`fieldVisualization${fieldCarouselIndex}`}>
                                    <Form.Label>Visualização do campo</Form.Label>
                                    <Form.Select value={deviceFields[fieldCarouselIndex].visual_type} onChange={(e) => handleDeviceFieldChange(fieldCarouselIndex, 'visual_type', e.target.value)}>
                                        <option>Selecione uma visualização</option>
                                        <option value="line_chart">Gráfico de linha</option>
                                        <option value="bar_chart">Gráfico de barra</option>
                                        <option value="pie_chart">Gráfico de pizza</option>
                                        <option value="table">Tabela</option>
                                        <option value="number">Número</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* Botões de navegação no carousel */}
                                <div className="d-flex justify-content-between mt-3">
                                    <Button onClick={prevField} disabled={fieldCarouselIndex === 0}>
                                        Anterior
                                    </Button>
                                    <Button onClick={nextField} disabled={fieldCarouselIndex === fieldCount - 1}>
                                        Próximo
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="offset-3">
                            <Button onClick={prevStep} className="mt-3" style={{ marginRight: '20px' }}>
                                Anterior
                            </Button>
                            <Button onClick={nextStep} className="mt-3" style={{ marginRight: '20px' }} disabled>
                                Próximo
                            </Button>
                            <Button className="btn btn-danger mt-3" style={{ marginRight: '20px' }} onClick={() => navigate("/dispositivos")}>Cancelar</Button>
                            <Button className="btn btn-success mt-3" type="submit">Salvar</Button>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
}

export default FormDispositivo