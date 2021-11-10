import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
}
export default App;

