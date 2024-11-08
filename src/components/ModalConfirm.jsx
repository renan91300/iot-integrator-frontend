import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = ({ show, question, confirmAction, cancelAction, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>{question}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelAction}>
                    Não
                </Button>
                <Button variant="danger" onClick={confirmAction}>
                    Sim
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ModalConfirm.propTypes = {
    show: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
    confirmAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func,
    handleClose: PropTypes.func.isRequired
};

export default ModalConfirm;