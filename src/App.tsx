import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";

const App: React.FC = () => (
  <div>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">BrewMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Beer" id="basic-nav-dropdown">
              <NavDropdown.Item href="#beer">All</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#beer/ale">Ale</NavDropdown.Item>
              <NavDropdown.Item href="#beer/lager">Lager</NavDropdown.Item>
              <NavDropdown.Item href="#action/dark">Dark</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#review">Review</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <p>BrewMate</p>
  </div>
);

export default App;
