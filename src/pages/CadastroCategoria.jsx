import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from "react-bootstrap";
import CadastroDispositivos from './CadastroDispositivos'
import './Relatorio.css'
import GerardadosDispo from "../components/layout/GerardadosDispo";
import CadDispo from "./CadDispo"

const Dispotivos = () => {

    return (
        <>
            <h1>Categorias</h1>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="dark" className="noWrap">
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
                    <>
                        <GerardadosDispo />
                    </>
                </tbody>
            </Table>
        </>
    );
}

export default Dispotivos