import React, { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import { deleteLocation, fetchLocations } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";

const Localidades = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
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
        fetchLocations(localProjectId)
            .then((res) => {
                setLocations(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar as Localidades");
            })

    }

    function handleDeleteLocation(id) {
        setSelectedLocation(id);
        setShowModal(true);
    }

    function handleEdit(id) {
        navigate(`/localidades/${id}`);
    }

    function localDeleteLocation(id) {
        deleteLocation(id, localProjectId)
            .then(() => {
                toast.success("Localidade excluída com sucesso");
                fetch();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao excluir a localidade");
                const error = err.response.data.error;
                if (error) {
                    toast.error(error);
                }
            })
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <ToastContainer />
            <ModalConfirm
                show={showModal}
                question="Tem certeza que deseja excluir a localidade?"
                confirmAction={() => {
                    localDeleteLocation(selectedLocation);
                    setShowModal(false);
                }}
                cancelAction={() => setShowModal(false)}
                handleClose={() => setShowModal(false)}
            />
            <h1>Localidades</h1>
            <Button variant="btn btn-primary" onClick={() => navigate("/cadastrar_localidade")}>
                Adicionar localidade
            </Button>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="striped" className="noWrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Bloco</th>
                        <th>Andar</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody id="corpo">
                    {locations.map((location, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{location.name}</td>
                            <td>{location.block}</td>
                            <td>{location.floor}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => { handleEdit(location.id) }}>Editar</button>
                            </td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => { handleDeleteLocation(location.id) }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Localidades