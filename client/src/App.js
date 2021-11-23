import { Routes, Route } from "react-router-dom";

//components
import Login from "./components/login-page/login.component";
import Home from "./components/home-page/home.component"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/:id/*" element={<Home />} />
    </Routes>
  );
}