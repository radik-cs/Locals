import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);