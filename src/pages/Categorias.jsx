import React, { Component, useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from "react-bootstrap";
import CadastroDispositivos from './CadastroDispositivos'
import './Relatorio.css'
import GerardadosDispo from "../components/layout/GerardadosDispo";
import CadDispo from "./CadDispo"
import { fetchCategories } from "../services/users";
import { toast, ToastContainer } from "react-toastify";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    // TODO: save localProjectId in sessionStorage
    const localProjectId = sessionStorage.getItem("localProjectId")

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

    useEffect(() => {
        fetch();
    }, []);


    return (
        <>
            <ToastContainer/>
            <h1>Categorias</h1>
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
                            <td>{categoria.base_configuration}</td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => {}}>Editar</button>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Categorias