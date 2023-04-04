import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import '../Cadastro.css'
import React, { Component } from "react"
import axios from "axios"
import Menu from '../../components/layout/Menu'


class UpdateUser extends Component {

    constructor(id) {
        super();
        this.state = {
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.GetDados(id)
    }

    async GetDados(id) {

        var url = "http://localhost:8000/usuarios/"
        url += id.id;

        console.log(url)

        const resp = await axios.get(url);
        this.setState(resp.data);

        var categoria;
        var seletor = resp.data.categoria;

        if (seletor == "0") {
            categoria = '#prof'
        } else if (seletor == "1") {
            categoria = '#aluno'
        }

        document.querySelector(categoria).click()
    }


    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async cadastrar() {

        let url = "http://localhost:8000/usuarios/"
        let form = this.state;

        url += form.id;
        console.log(form);

        try {
            await axios.put(url, form)
            alert("Usuário atualizado")


        } catch (error) {
            console.log(error)
        }

        document.querySelector('.btn-close').click()
        this.forceUpdate(Menu)
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
                            <Form.Control name="nome" type="text" placeholder="Digite o Nome" value={this.state.nome} onChange={this.onInputchange} />
                        </Col>
                    </Form.Group>

                    <Form.Label column sm="6">
                        Usuário
                    </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
                        <Col>
                            <Form.Control name="usuario" type="text" placeholder="Digite seu Usuário" value={this.state.usuario} onChange={this.onInputchange} />
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
                        <Button className="botao" variant="primary" size="lg" active onClick={() => this.cadastrar()}>
                            Atualizar
                        </Button>
                    </>
                </Form>

            </>
        );
    }
}

export default UpdateUser