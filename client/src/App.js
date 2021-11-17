import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/home/:id/*" element={<Home />} />
    </Routes>
  );
}