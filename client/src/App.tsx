import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  Home,
  BeerList,
  BeerInfo,
  Login,
  Register,
  Dashboard,
  PrivacyPolicy,
  NewBeer,
} from "./routes";
import { NavbarWrapper, FooterWrapper } from "./components";

const App: React.FC = () => (
  <div>
    <NavbarWrapper />
    <Container className="my-4">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="beer">
            <Route index element={<BeerList />} />
            <Route path="new" element={<NewBeer />} />
            <Route path=":id" element={<BeerInfo />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Container>
    <FooterWrapper />
  </div>
);

export default App;
