import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AperturaCartera from './components/AperturaCartera';
import RegistroCredito from './components/RegistroCredito';
import VisualizacionCreditos from './components/VisualizacionCreditos';
import InformacionGeneral from './components/InformacionGeneral';
import PerfilUsuario from './components/PerfilUsuario';
import AgregarCliente from './components/AgregarCliente';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/apertura-cartera" element={<ProtectedRoute><AperturaCartera /></ProtectedRoute>} />
        <Route path="/registro-credito" element={<ProtectedRoute><RegistroCredito /></ProtectedRoute>} />
        <Route path="/visualizacion-creditos" element={<ProtectedRoute><VisualizacionCreditos /></ProtectedRoute>} />
        <Route path="/informacion-general" element={<ProtectedRoute><InformacionGeneral /></ProtectedRoute>} />
        <Route path="/perfil-usuario" element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>} />
        <Route path="/agregar-cliente" element={<ProtectedRoute><AgregarCliente /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;