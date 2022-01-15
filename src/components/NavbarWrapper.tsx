import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";

const NavbarWrapper: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const logOut = (): void => {
    localStorage.removeItem("token");
    setUsername("");
    navigate("/");
  };

  useEffect(() => {
    api.get("/user/isAuth").then((res) => {
      if (res.status === 200) {
        setUsername(res.data.name);
      }
    });
  });

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
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={logOut}>Log Out</Nav.Link>
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
