import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateUser from './UpdateUser';
import React from "react"
import { Document } from 'domhandler';

var idgeral;

function Sobrepor(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            width="auto"
        >
            <Modal.Header closeButton id="btn">
                <Modal.Title id="contained-modal-title-vcenter">
                    Edição de Usuários
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateUser id={idgeral} />
            </Modal.Body>

        </Modal>
    );
}

function PegarId() {
    // console.log(event.srcElement.id)
    idgeral = event.srcElement.id
}

function UserUp(userId) {

    const [modalShow, setModalShow] = React.useState(false);



    return (

        <>
            <Button className='botao' id={userId} variant="primary" onClick={() => {
                setModalShow(true);
                PegarId();
            }}>
                Editar
            </Button>

            <Sobrepor
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default UserUp