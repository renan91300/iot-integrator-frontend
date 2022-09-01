import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <img
              alt=""
              src="https://www.ifes.edu.br/templates/padraogoverno01/android-icon-192x192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          <Navbar.Brand href="#home">IFES</Navbar.Brand>
      </Navbar>
    );
}

export default Header