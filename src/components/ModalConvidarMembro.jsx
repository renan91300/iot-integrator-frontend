import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalConvidarMembro = ({ show, inputs, handleChange, handleSubmit, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Convidar novo membro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating">
                        <Form.Control autoFocus type="text" name="name" value={inputs?.name} onChange={handleChange} placeholder="Digite o nome do membro" />
                        <Form.Label>Nome</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mt-3">
                        <Form.Control type="email" name="email" value={inputs?.email} onChange={handleChange} placeholder="Digite o email do membro" />
                        <Form.Label>Email</Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Criar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConvidarMembro;