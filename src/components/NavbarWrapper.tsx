import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavbarWrapper: React.FC = () => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>BrewMate</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Beer" id="basic-nav-dropdown">
            <LinkContainer to="/beer">
              <NavDropdown.Item>All</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/beer/ale">
              <NavDropdown.Item>Ale</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/beer/lager">
              <NavDropdown.Item>Lager</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/beer/dark">
              <NavDropdown.Item>Dark</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/review">
            <Nav.Link>Review</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export { NavbarWrapper };
