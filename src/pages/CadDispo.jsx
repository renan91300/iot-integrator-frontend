import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react"
import CadastroDispositivos from './CadastroDispositivos';

function Sobreposicao(props) {
  return (
    <Modal id="modal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      width="auto"
    >
      <Modal.Header closeButton id="btn">
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro de Dispositivos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CadastroDispositivos />
      </Modal.Body>

    </Modal>
  );
}

function CadDispo() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='botao' variant="primary" onClick={() => setModalShow(true)}>
        Cadastrar Dispositivos
      </Button>

      <Sobreposicao
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default CadDispo