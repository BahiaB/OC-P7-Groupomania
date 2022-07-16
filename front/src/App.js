import React from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Account from "./pages/Account.js";
import Navbar from "./components/Navbar.js";
import UserSearch from "./pages/UserSearch"
import './styles/index.css';

function App() {

  return (
    <div className="Router">
      <BrowserRouter>
        <Navbar />
        {<Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/UserSearch/:id" element={<UserSearch />} />
          <Route path="/UserSearch/" element={<UserSearch />} />

        </Routes>}

      </BrowserRouter>
    </div>
  );
}

export default App;

