import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from "react-bootstrap";
import ReactDOM from 'react-dom/client'
import CadastroDispositivos from './CadastroDispositivos'
import './Relatorio.css'
import GerardadosDispo from "../components/layout/GerardadosDispo";
import CadDispo from "./CadDispo"

class RelDispo extends Component {

    cadastro() {
        ReactDOM.createRoot(document.getElementById('mainPage')).render(
            <React.StrictMode>
                <CadastroDispositivos />
            </React.StrictMode>
        )
    }

    render() {
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
                            <GerardadosDispo />
                        </>
                    </tbody>
                </Table>
            </>
        );
    }
}

export default RelDispo