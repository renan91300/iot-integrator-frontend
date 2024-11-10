import './App.css';
import Login from './pages/login';
import PrivateRoute from "./components/privateRoutes";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Dispositivos from './pages/Dispositivos';
import FormDispositivo from './pages/FormDispositivo';
import Categorias from './pages/Categorias';
import FormCategoria from './pages/FormCategoria';
import Projetos from './pages/Projetos';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path="/"
          element={
            <Layout />
          }
        >
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="dispositivos" element={<PrivateRoute><Dispositivos /></PrivateRoute>} />
          <Route path="dispositivos/:id" element={<PrivateRoute><FormDispositivo /></PrivateRoute>}></Route>
          <Route path="cadastrar_dispositivo" element={<PrivateRoute><FormDispositivo /></PrivateRoute>}></Route>
          <Route path="categorias" element={<PrivateRoute><Categorias /></PrivateRoute>}></Route>
          <Route path="categorias/:id" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
          <Route path="cadastrar_categoria" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
        </Route>
        <Route path="projetos" element={<PrivateRoute><Projetos /></PrivateRoute>}></Route>
      </Routes>
    </Router>
  )
}

export default App
