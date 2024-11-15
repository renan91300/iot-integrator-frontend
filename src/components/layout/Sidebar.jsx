import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    navigate('/login');
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h3>Bem-Vindo</h3>
      <Nav className="flex-column mt-3">
        <Nav.Link as={NavLink} to="/dispositivos" onClick={toggleSidebar}>
          Dispositivos
        </Nav.Link>
        <Nav.Link as={NavLink} to="/categorias" onClick={toggleSidebar}>
          Categorias
        </Nav.Link>
        <Nav.Link as={NavLink} to="/localidades" onClick={toggleSidebar}>
          Localidades
        </Nav.Link>
        <Nav.Link as={NavLink} to="/membros" onClick={toggleSidebar}>
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
