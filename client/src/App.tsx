import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home, BeerList } from "./routes";
import { NavbarWrapper, FooterWrapper } from "./components";

const App: React.FC = () => (
  <div>
    <NavbarWrapper />
    <Container className="mt-4">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="beer" element={<BeerList />} />
        </Route>
      </Routes>
    </Container>
    <FooterWrapper />
  </div>
);

export default App;
