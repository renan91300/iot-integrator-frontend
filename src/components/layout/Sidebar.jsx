import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Sidebar.css'
import Users from "../../pages/users"
import ReactDOM from 'react-dom/client'
import Dashboard from "../../pages/Dashboard"
import NavDropdown from 'react-bootstrap/NavDropdown';
import RelDispo from '../../pages/RelDispo'


class Sidebar extends Component {

    dash() {
        document.getElementById("rela").classList.remove('active')
        document.getElementById("dash").classList.add('active')

        ReactDOM.createRoot(document.getElementById('mainPage')).render(
            <React.StrictMode>
                <Dashboard />
            </React.StrictMode>
        )
    }

    relatar() {
        document.getElementById("rela").classList.add('active')
        document.getElementById("dash").classList.remove('active')
    }

    relUs() {
        ReactDOM.createRoot(document.getElementById('mainPage')).render(
            <React.StrictMode>
                <Users />
            </React.StrictMode>
        )
    }

    relDis() {
        ReactDOM.createRoot(document.getElementById('mainPage')).render(
            <React.StrictMode>
                <RelDispo />
            </React.StrictMode>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
                <center>
                    <span className="fs-4">Bem-vindo</span>
                </center>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white active" aria-current="page" onClick={this.dash} id="dash">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <NavDropdown
                            id="rela"
                            title="Relatórios"
                            menuVariant="dark"
                            className="letra"
                            onClick={this.relatar}
                        >
                            <NavDropdown.Item onClick={this.relUs}>Relatório de Usuários</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.relDis}>
                                Relatório de Dispositivos
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                </ul>
                <hr />
            </div>
        );
    }
}

export default Sidebar