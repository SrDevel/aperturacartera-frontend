import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import RegistroCredito from './components/RegistroCredito';
import VisualizacionCreditos from './components/VisualizacionCreditos';
import InformacionGeneral from './components/InformacionGeneral';
import PerfilUsuario from './components/PerfilUsuario';
import GestionClientes from './components/GestionClientes';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/gestion-clientes" element={<ProtectedRoute><GestionClientes /></ProtectedRoute>} />
        <Route path="/registro-credito" element={<ProtectedRoute><RegistroCredito /></ProtectedRoute>} />
        <Route path="/visualizacion-creditos" element={<ProtectedRoute><VisualizacionCreditos /></ProtectedRoute>} />
        <Route path="/informacion-general" element={<ProtectedRoute><InformacionGeneral /></ProtectedRoute>} />
        <Route path="/perfil-usuario" element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;