import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom"
import './style.css';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><strong style={{color:"red"}}>MovieFlix</strong></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link href="/add"><b> Create New Movies </b></Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;