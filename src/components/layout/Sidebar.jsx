import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Importando o arquivo CSS separado

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Bem-Vindo</h3>
      <Nav className="flex-column mt-3">
        <Nav.Link as={NavLink} to="/" exact>
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
        <Nav.Link as={NavLink} to="/participantes">
          Participantes
        </Nav.Link>
        <Button variant="danger" className="logout-button">
            Sair
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
