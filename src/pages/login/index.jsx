import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';

import { generateTokens, validateToken } from "../../services/authentication";
import { toast, ToastContainer } from "react-toastify";
import { Card } from "react-bootstrap";

export default function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const AccessToken = localStorage.getItem("accesstoken");

    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        generateTokens({ email: email, password: password })
            .then((res) => {
                localStorage.setItem("accesstoken", res.access);
                localStorage.setItem("refreshtoken", res.refresh);
                navigate("/projetos")
            })
            .catch((err) => {
                toast.error("Credenciais incorretas, por favor, verifique seu email e senha");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function verifyToken() {
        if (AccessToken) {
            validateToken(AccessToken)
                .then(() => {
                    navigate("/projetos")
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

        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h3 className="text-center mb-4">Login</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Carregando...' : 'Entrar'}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Button variant="link" onClick={() => navigate('/forgot-password')}>
                                    Esqueceu a senha?
                                </Button>
                            </div>
                            <div className="text-center mt-3">
                                <Button variant="link" onClick={() => navigate('/register')}>
                                    Não tem uma conta? Cadastre-se
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

