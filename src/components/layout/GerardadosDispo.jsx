import React, { Component } from "react"
import axios from "axios";
import './Gerardadost.module.css'
import DispoUp from "../../pages/DispoUp";
import Button from 'react-bootstrap/Button'

var data

class GerardadosDispo extends Component {
    state = {
        dispositivos: [],
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/device/')
        this.setState({ dispositivos: resp.data })
    }

    async remove(id) {
        console.log(this.usuario)
        var url = "http://localhost:8000/api/device/"
        url += id
        console.log(url)
        await axios.delete(url)
        this.forceUpdate(GerardadosDispo)
    }

    async update(id) {

        this.id = id
        DispoUp(id)
    }

    render() {

        const { dispositivos } = this.state
        let i = 1;
        return (
            <>
                {dispositivos.map(dispositivos => (
                    <tr key={dispositivos.id}>
                        <td>
                            {i++}
                        </td>
                        <td>
                            {dispositivos.nome}
                        </td>
                        <td>
                            {dispositivos.hash}
                        </td>
                        <td>
                            {dispositivos.descricao}
                        </td>
                        <td><DispoUp id1={dispositivos.id} /></td>
                        <td><Button className='botao2' onClick={() => this.remove(dispositivos.id)}>Excluir</Button></td>
                    </tr>
                ))}
            </>
        );
    }
}

export default GerardadosDispo

