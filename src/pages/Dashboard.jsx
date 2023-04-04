import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.module.css'


class Dashboard extends Component {
    componentDidMount() {
        document.title = "Dashboard"
    }

    render() {
        return (
            <>
                <h1>
                    Dashboard
                </h1>
                <hr style={{ width: "45vw" }}></hr>
                <h4>
                    Dados de Uso
                </h4>

            </>
        );
    }
}

export default Dashboard