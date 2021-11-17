import React from 'react'
import { Routes, Route } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/*" element={<Home />} />
    </Routes>
  );
}