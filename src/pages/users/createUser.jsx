import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import '../Cadastro.css'
import React, { Component } from "react"
import axios from "axios"


class CreateUser extends Component {

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

        let url = "http://localhost:8000/usuarios/"
        let form = this.state;
        console.log(form);

        if (form.senha != form.senha2) {
            alert("Use senhas iguais")
        } else {
            try {
                await axios.post(url, form)
                alert("Usuário cadastrado")


            } catch (error) {
                console.log(error)
            }

            document.querySelector('.btn-close').click()
            this.forceUpdate(GerarDadost)
        }

    }

    render() {
        return (
            <>
                <Form className='teste'>
                    <Form.Label class="label" column sm="2">
                        Nome
                    </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Col>
                            <Form.Control name="nome" type="text" placeholder="Digite seu Nome" value={this.state.name} onChange={this.onInputchange} />
                        </Col>
                    </Form.Group>

                    <Form.Label column sm="6">
                        Usuário
                    </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
                        <Col>
                            <Form.Control name="usuario" type="text" placeholder="Digite seu Usuário" value={this.state.user} onChange={this.onInputchange} />
                        </Col>
                    </Form.Group>

                    <Form.Label column sm="6">
                        Crie uma senha
                    </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextSenha">
                        <Col>
                            <Form.Control name="senha" type="password" placeholder="Senha" value={this.state.password} onChange={this.onInputchange} />
                        </Col>
                    </Form.Group>

                    <Form.Label column sm="6">
                        Confirmar Senha
                    </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextSenha2">
                        <Col>
                            <Form.Control name="senha2" type="password" placeholder="Senha"
                                value={this.state.password2} onChange={this.onInputchange} />
                        </Col>
                    </Form.Group>
                    <div className="mb-3 op">
                        <Form.Check
                            label="Professor"
                            value="0"
                            name="categoria"
                            type="radio"
                            id="prof"
                            onChange={this.onInputchange} />
                        <Form.Check
                            label="Aluno"
                            value="1"
                            name="categoria"
                            type="radio"
                            id="aluno"
                            onChange={this.onInputchange} />
                    </div>
                    <>
                        <Button className="botao" variant="primary" size="lg" active onClick={(e) => this.cadastrar(e)}>
                            Cadastrar
                        </Button>
                    </>
                </Form>

            </>
        );
    }
}

export default CreateUser