import React, { useEffect, useState } from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { createProject, fetchProjects } from '../services/users';
import { useNavigate } from 'react-router-dom';
import './Projetos.css';
import ModalCriarProjeto from '../components/ModalCriarProjeto';
import handleChange from "../components/utils/handleChange";
import { toast, ToastContainer } from 'react-toastify';

const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  function fetch() {
    setLoading(true);
    fetchProjects()
      .then((res) => {
        setProjects(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Algo deu errado ao buscar os projetos');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSelectProject(id) {
    sessionStorage.setItem('localProjectId', id);
    navigate("/dispositivos");
  }

  const localHandleChange = (event) => {
    handleChange(event, inputs, setInputs);
  }

  function getDescriptionPreview(description) {
    return description.length > 50 ? `${description.substring(0, 50)}...` : description;
  }

  function handleCreateProject() {
    setShowModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: inputs?.name,
      description: inputs?.description,
    }
    createProject(data)
      .then(() => {
        toast.success('Projeto criado com sucesso');
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Algo deu errado ao criar o projeto');
      });

  }

  useEffect(() => {
    fetch();
  }, []);


  return (
    <div className="my-5 projects-container col-6 offset-3">
      <ToastContainer />
      <ModalCriarProjeto
        show={showModal}
        inputs={inputs}
        handleChange={localHandleChange}
        handleSubmit={handleSubmit}
        handleClose={() => setShowModal(false)}
      />
      <h2 className="text-center mb-4">Selecione um Projeto</h2>

      {projects.length === 0 ? (
        <div className="text-center">
          <p>Você ainda não possui nenhum projeto.</p>
          <Button variant="primary" onClick={handleCreateProject}>Criar Novo Projeto</Button>
        </div>
      ) : (
        <>
          <div className="mb-4 project-card-row">
            {projects.map((project) => (
              <Card onClick={() => onSelectProject(project.id)} key={project.id} className="project-card shadow-sm">
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip className='tooltip-inner'>{project.description}</Tooltip>}
                    >
                      <span>{getDescriptionPreview(project.description)}</span>
                    </OverlayTrigger>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="text-center mb-3">
            <Button variant="primary" onClick={handleCreateProject}>Criar Novo Projeto</Button>
          </div>
        </>
      )
      }
    </div >
  );
}

export default Projetos;
