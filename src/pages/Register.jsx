import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { createUser } from '../services/authentication';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== re_password) {
            setErrors({ re_password: 'Senhas não conferem' });
            setLoading(false);
            return;
        }

        createUser({ name, email, password, re_password })
            .then(() => {
                toast.success("Conta criada com sucesso!");
                navigate('/login');
            })
            .catch((err) => {
                toast.error("Erro ao criar conta: ");
                if (err.response.status === 400) {
                    setErrors(err.response.data);
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={5} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h3 className="text-center mb-4">Criar Conta</h3>
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className='mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        className={errors.email ? 'is-invalid' : ''}
                                        placeholder="Digite seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        className={errors.password ? 'is-invalid' : ''}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>Confirme a Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        className={errors.re_password ? 'is-invalid' : ''}
                                        value={re_password}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.re_password}</Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Registrando...' : 'Criar Conta'}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Button variant="link" onClick={() => navigate('/login')}>
                                    Já tem uma conta? Faça login
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Register;
