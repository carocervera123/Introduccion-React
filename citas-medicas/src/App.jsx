import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CitaDetalle from './pages/CitaDetalle.jsx';
import Home from './pages/Home.jsx';
import Citas from './pages/Citas.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/citas" className="nav-link">Ver Citas</Link>
      </nav>
      <div className="content-area">
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          {}
          <Route path="/citas" element={<Citas />} />
          {}
          <Route path="/cita/:id" element={<CitaDetalle />} />
          {}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
