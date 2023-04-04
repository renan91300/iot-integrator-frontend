import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateUser from './createUser';
import React from "react"

function Sobrepor(props) {
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
          Cadastro de Usuários
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateUser />
      </Modal.Body>

    </Modal>
  );
}

function CreateUserModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='botao' variant="primary" onClick={() => setModalShow(true)}>
        Cadastrar Usuários
      </Button>

      <Sobrepor
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default CreateUserModal