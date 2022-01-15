import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home, BeerList, Login, Register } from "./routes";
import { NavbarWrapper, FooterWrapper } from "./components";

const App: React.FC = () => (
  <div>
    <NavbarWrapper />
    <Container className="my-4">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="beer" element={<BeerList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Container>
    <FooterWrapper />
  </div>
);

export default App;
