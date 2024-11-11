import React, { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import { fetchDevices } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dispotivos = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId")

    function fetch() {
        setLoading(true);
        fetchDevices(localProjectId)
            .then((res) => {
                setDispositivos(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar os dispositivos");
            })

    }

    useEffect(() => {
        fetch();
    }, []);


    return (
        <>
            <ToastContainer />
            <h1>Relatório de Dispositivos</h1>
            <Button variant="btn btn-primary" onClick={() => navigate("/cadastrar_dispositivo")}>
                Adicionar Dispositivo
            </Button>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Localização</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositivos.map((dispositivo) => (
                        <tr key={dispositivo.id}>
                            <td>{dispositivo.name}</td>
                            <td>{dispositivo.location_name}</td>
                            <td>{dispositivo.category_name}</td>
                            <td>{dispositivo.status?.field_name}: {dispositivo.status?.field_value}</td>
                            <td>
                                <Button variant="btn btn-primary" onClick={() => navigate(`/editar_dispositivo/${dispositivo.id}`)}>
                                    Editar
                                </Button>
                            </td>
                            <td>
                                <Button variant="btn btn-danger" onClick={() => navigate(`/excluir_dispositivo/${dispositivo.id}`)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Dispotivos