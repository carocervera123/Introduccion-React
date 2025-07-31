import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home..jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import './App.css'; 

const App = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem('user'); 
      }
    }
  }, []); 

  const login = (username) => {
    const userData = { username }; 
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('user'); 
  };

  return (
    <Router>
      <nav className="main-nav">
        <Link to="/" className="nav-link">Inicio</Link>
        {user && <Link to="/profile" className="nav-link">Perfil</Link>}
        {!user && <Link to="/login" className="nav-link">Iniciar Sesión</Link>}
        {user && <span className="welcome-message">Hola, {user.username}</span>}
        {user && <button onClick={logout} className="nav-logout-btn">Cerrar Sesión</button>}
      </nav>
      <div className="content-area">
        <Routes>
          {}
          <Route path="/login" element={<Login onLogin={login} />} />

          {}
          <Route path="/" element={<Home user={user} logout={logout} />} />

          {}
          {}
          {}
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
          />

          {}
          <Route path="*" element={<h2 className="page-container error-message">404 - Página No Encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
