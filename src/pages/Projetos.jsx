import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProjects } from '../services/users';
import { useNavigate } from 'react-router-dom';

const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

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
    navigate("/");
  }

  function handleCreateProject() {
    navigate("/projetos/novo");
  }

  useEffect(() => {
    fetch();
  }, []);


  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Selecione um Projeto</h2>

      {projects.length === 0 ? (
        <div className="text-center">
          <p>Você ainda não possui nenhum projeto.</p>
          <Button variant="primary" onClick={handleCreateProject}>Criar Novo Projeto</Button>
        </div>
      ) : (
        <>
          <Row className="mb-3">
            {projects.map((project) => (
              <Col md={4} key={project.id} className="mb-4">
                <Card onClick={() => onSelectProject(project.id)} className="project-card h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center">
            <Button variant="primary" onClick={handleCreateProject}>Criar Novo Projeto</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Projetos;
