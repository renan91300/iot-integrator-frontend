import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    // Inverte estado da sidebar, se o tamanho da tela for pequeno
    if (isSmallScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  useEffect(() => {
    // Função para verificar largura da tela
    const handleResize = () => {
      const isSmall = window.innerWidth <= 768; // Define breakpoint para telas menores
      setIsSmallScreen(isSmall);
      setIsSidebarOpen(!isSmall); // Sidebar aberta por padrão em telas grandes
    };

    // Adiciona listener e chama a função ao carregar
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove listener no cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="layout">
      {isSmallScreen && (
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <ToastContainer />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <aside className={`content ${isSidebarOpen && !isSmallScreen ? 'with-sidebar' : ''}`}>
        <Outlet />
      </aside>
    </div>
  );
};

export default Layout;
