import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';

const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App
