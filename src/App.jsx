import './App.css';
import Login from './pages/login';
import PrivateRoute from "./components/privateRoutes";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Dispositivos from './pages/Dispositivos';
import Categorias from './pages/Categorias';
import FormCategoria from './pages/FormCategoria';

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
            <Route path="categorias" element={<PrivateRoute><Categorias /></PrivateRoute>}></Route>
            <Route path="categorias/:id" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
            <Route path="cadastrar_categoria" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
          </Route>
      </Routes>
    </Router>
  )
}

export default App
