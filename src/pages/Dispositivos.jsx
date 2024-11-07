import React, { Component, useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from "react-bootstrap";
import CadastroDispositivos from './CadastroDispositivos'
import './Relatorio.css'
import GerardadosDispo from "../components/layout/GerardadosDispo";
import CadDispo from "./CadDispo"
import { fetchDevices } from "../services/users";
import { toast } from "react-toastify";

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
            <h1>Relatório de Dispositivos</h1>
            <CadDispo />
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