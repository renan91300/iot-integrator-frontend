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
import Localidades from './pages/Localidades';
import FormLocalidade from './pages/FormLocalidade';
import Membros from './pages/Membros';
import DeviceMetrics from './pages/DeviceMetrics';
import Register from './pages/Register';
import AceitarConvite from './pages/AceitarConvite';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/aceitar_convite/:token' element={<AceitarConvite />} />
        <Route
          path="/"
          element={
            <Layout />
          }
        >
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="dispositivos" element={<PrivateRoute><Dispositivos /></PrivateRoute>} />
          <Route path="dispositivos/:id" element={<PrivateRoute><FormDispositivo /></PrivateRoute>}></Route>
          <Route path="dispositivos/:id/dashboard" element={<PrivateRoute><DeviceMetrics /></PrivateRoute>}></Route>
          <Route path="cadastrar_dispositivo" element={<PrivateRoute><FormDispositivo /></PrivateRoute>}></Route>
          <Route path="categorias" element={<PrivateRoute><Categorias /></PrivateRoute>}></Route>
          <Route path="categorias/:id" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
          <Route path="cadastrar_categoria" element={<PrivateRoute><FormCategoria /></PrivateRoute>}></Route>
          <Route path="localidades" element={<PrivateRoute><Localidades /></PrivateRoute>}></Route>
          <Route path="localidades/:id" element={<PrivateRoute><FormLocalidade /></PrivateRoute>}></Route>
          <Route path="cadastrar_localidade" element={<PrivateRoute><FormLocalidade /></PrivateRoute>}></Route>
          <Route path="membros" element={<PrivateRoute><Membros /></PrivateRoute>}></Route>          
        </Route>
        <Route path="projetos" element={<PrivateRoute><Projetos /></PrivateRoute>}></Route>
      </Routes>
    </Router>
  )
}

export default App
