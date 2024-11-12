import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Importando o arquivo CSS separado

const Sidebar = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    navigate('/login');
  }

  return (
    <div className="sidebar">
      <h3>Bem-Vindo</h3>
      <Nav className="flex-column mt-3">
        <Nav.Link as={NavLink} to="/" exact="true">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/dispositivos">
          Dispositivos
        </Nav.Link>
        <Nav.Link as={NavLink} to="/categorias">
          Categorias
        </Nav.Link>
        <Nav.Link as={NavLink} to="/localidades">
          Localidades
        </Nav.Link>
        <Nav.Link as={NavLink} to="/membros">
          Membros
        </Nav.Link>
        <Button variant="danger" className="logout-button" onClick={handleLogout}>
            Sair
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
