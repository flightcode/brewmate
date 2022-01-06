import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Beer } from "./routes";
import { NavbarWrapper } from "./components";

const App: React.FC = () => (
  <div>
    <NavbarWrapper />
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="beer" element={<Beer />} />
      </Route>
    </Routes>
  </div>
);

export default App;
