import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { api } from "../utils";

const NavbarWrapper: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    api
      .get("/auth/isAuth")
      .then((res) => {
        if (res.data) {
          setUsername(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, [""]);

  return (
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
          {username ? (
            <Nav>
              <LinkContainer to={`/user/${username}`}>
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarWrapper };
