import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Beers } from "./routes";
import { NavbarWrapper } from "./components";

const App: React.FC = () => (
  <div>
    <NavbarWrapper />
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="beers" element={<Beers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
