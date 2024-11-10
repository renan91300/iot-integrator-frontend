import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalCriarProjeto = ({ show, inputs, handleChange, handleSubmit, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Criar novo projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating">
                        <Form.Control autoFocus type="text" name="name" value={inputs?.name} onChange={handleChange} placeholder="Digite o nome do projeto" />
                        <Form.Label>Nome do projeto</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mt-3">
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={inputs?.description}
                            onChange={handleChange}
                            rows={10}
                            placeholder="Digite uma descrição para o projeto"
                            style={{ width: '100%', minHeight: '300px' }}
                        />
                        <Form.Label>Descrição do projeto</Form.Label>
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

export default ModalCriarProjeto;