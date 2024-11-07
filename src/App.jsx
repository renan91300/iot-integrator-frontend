import './App.css';
import Login from './pages/login';
import PrivateRoute from "./components/privateRoutes";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

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
            {/* <Route path="dispositivos" element={<Dispositivos />} /> */}
          </Route>
      </Routes>
    </Router>
  )
}

export default App
