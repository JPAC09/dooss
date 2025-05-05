import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './navigation';
import Home from './content/home';
import About from './content/about';
import Services from './content/services';
import Booking from './content/book';
import Signup from './content/signup';
import Login from './content/login';
import Dashboard from './content/dashboard';

function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
      <Navigation user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Booking user={user}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
