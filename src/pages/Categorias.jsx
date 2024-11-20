import React, { useEffect, useState } from "react"
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { deleteCategory, fetchCategories } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId")

    const getJsonPreview = (json) => {
        const jsonString = JSON.stringify(json);
        return jsonString.length > 50 ? `${jsonString.substring(0, 50)}...` : jsonString;
    };

    function fetch() {
        setLoading(true);
        fetchCategories(localProjectId)
            .then((res) => {
                setCategorias(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar as categorias");
            })

    }

    function handleDeleteCategory(id) {
        setSelectedCategory(id);
        setShowModal(true);
    }

    function handleEdit(id) {
        navigate(`/categorias/${id}`);
    }

    function localDeleteCategory(id) {
        deleteCategory(id, localProjectId)
            .then(() => {
                toast.success("Categoria excluída com sucesso");
                fetch();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao excluir a categoria");
                const error = err.response.data.error;
                if (error) {
                    toast.error(error);
                }
            })
    }

    useEffect(() => {
        fetch();
        toast.success("Categorias carregadas com sucesso");
    }, []);

    return (
        <>
            <ModalConfirm
                show={showModal}
                question="Tem certeza que deseja excluir a categoria?"
                confirmAction={() => {
                    localDeleteCategory(selectedCategory);
                    setShowModal(false);
                }}
                cancelAction={() => setShowModal(false)}
                handleClose={() => setShowModal(false)}
            />
            <h1>Categorias</h1>
            <Button variant="btn btn-primary" onClick={() => navigate("/cadastrar_categoria")}>
                Adicionar categoria
            </Button>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="striped" className="noWrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Configuração Base</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody id="corpo">
                    {categorias.map((categoria, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{categoria.name}</td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{JSON.stringify(categoria.base_settings)}</Tooltip>}
                                >
                                    <span>{getJsonPreview(categoria.base_settings)}</span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => { handleEdit(categoria.id) }}>Editar</button>
                            </td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => { handleDeleteCategory(categoria.id) }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Categorias