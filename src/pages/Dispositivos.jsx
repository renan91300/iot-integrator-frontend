import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { fetchDevices } from "../services/users";
import { toast, ToastContainer } from "react-toastify";

const Dispotivos = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [loading, setLoading] = useState(false);

    // TODO: save localProjectId in sessionStorage
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
            <ToastContainer/>
            <h1>Relatório de Dispositivos</h1>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="dark" className="noWrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Hash</th>
                        <th>Descrição</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody id="corpo">
                    <>
                    </>
                </tbody>
            </Table>
        </>
    );
}

export default Dispotivos