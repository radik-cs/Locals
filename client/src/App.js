//possibly dont need this
import React from 'react'
//empty css file
import './App.css';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//components
import Login from "./components/login.component";
import Home from "./components/home.component"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path = "/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}