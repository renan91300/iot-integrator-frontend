import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateDispo from './UpdateDispo';
import React from "react"

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
                    Edição de Dispositivos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateDispo id={idgeral} />
            </Modal.Body>

        </Modal>
    );
}

function PegarId() {
    // console.log(event.srcElement.id)
    idgeral = event.srcElement.id
}

function DispoUp(id1) {

    const [modalShow, setModalShow] = React.useState(false);



    return (

        <>
            <Button className='botao' id={id1.id1} variant="primary" onClick={() => {
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

export default DispoUp