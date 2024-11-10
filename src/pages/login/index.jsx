import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import './styles.css';

import { generateTokens, validateToken } from "../../services/authentication";
import { toast, ToastContainer } from "react-toastify";

export default function LoginScreen() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ButtonText, setButtonText] = useState("Entrar");
    const AccessToken = localStorage.getItem("accesstoken");

    function login() {
        event.preventDefault();
        setButtonText("Aguarde um momento...");
        generateTokens({ email: Email, password: Password })
            .then((res) => {
                localStorage.setItem("accesstoken", res.access);
                localStorage.setItem("refreshtoken", res.refresh);
                navigate("/projetos")
            })
            .catch((err) => {
                setButtonText("Entrar");
                toast.error("Credenciais incorretas, por favor, verifique seu email e senha");
            });
    }

    function verifyToken() {
        if (AccessToken) {
            validateToken(AccessToken)
                .then(() => {
                    navigate("/")
                })
                .catch(() => {
                    localStorage.removeItem("accesstoken");
                    localStorage.removeItem("refreshtoken");
                });
        }
    }

    useEffect(() => {
        verifyToken();
        //eslint-disable-next-line
    }, []);

    return (

        <div className="App" style={{ backgroundImage: `url(/src/assets/logo.jpeg)` }}>

            <>
                <ToastContainer />
                <Header />
                <br />
                <br />
                <Container className="p-3">
                    <h2 className="titulo">Fazer Login</h2>
                    <Form onSubmit={login}>
                        <Form.Label className="label" column sm="2">
                            Email
                        </Form.Label>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
                            <Col>
                                <Form.Control name="email" type="email" placeholder="Digite seu email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Label column sm="2">
                            Senha
                        </Form.Label>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col>
                                <Form.Control name="senha" type="password" placeholder="Senha" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Button className="btn btn-primary" type="submit">
                            {ButtonText}
                        </Button>

                    </Form>
                </Container>
                <Footer />
            </>
        </div>
    );
}

