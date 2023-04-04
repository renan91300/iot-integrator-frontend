import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import './Cadastro.css'
import React, { Component } from "react"
import axios from "axios"
import GerardadosDispo from "../components/layout/GerardadosDispo"


class CadastroDispositivos extends Component {

    constructor() {
        super();
        this.state = {
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async cadastrar(e) {

        let url = "http://localhost:8000/dispositivos"
        let form = this.state;
        console.log(form);
        try {
            await axios.post(url, form)
            alert("Dispositivo cadastrado")


        } catch (error) {
            console.log(error)
        }

        document.querySelector('.btn-close').click()
        this.forceUpdate(GerardadosDispo)
    }




    render() {
        return (
            <>
                <Form className='teste'>
                    <center>
                        <Form.Label style={{ display: 'inline' }} class="label" column sm="2">
                            Nome do Dispositivo
                        </Form.Label>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                            <Col>
                                <Form.Control style={{ width: '250px' }} name="nome" type="text" placeholder="Digite o nome do Dispositivos" value={this.state.nameDispo} onChange={this.onInputchange} />
                            </Col>
                        </Form.Group>

                        <Form.Label column sm="6">
                            Hash
                        </Form.Label>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
                            <Col>
                                <Form.Control name="hash" type="text" placeholder="Digite o código Hash" value={this.state.hash} onChange={this.onInputchange} />
                            </Col>
                        </Form.Group>

                        <Form.Label column sm="6">
                            Descrição
                        </Form.Label>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
                            <Col>
                                <Form.Control size='lg' name="descricao" type="text" placeholder="Descrição do dispositivo" value={this.state.descricao} onChange={this.onInputchange} />
                            </Col>
                        </Form.Group>
                        <>
                            <Button className="botao" variant="primary" size="lg" active onClick={(e) => this.cadastrar(e)}>
                                Cadastrar
                            </Button>
                        </>
                    </center>
                </Form>

            </>
        );
    }
}

export default CadastroDispositivos