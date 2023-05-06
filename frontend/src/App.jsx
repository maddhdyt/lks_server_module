import { Route, Routes } from 'react-router-dom';
import './index.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </div>
    );
}

export default App;
