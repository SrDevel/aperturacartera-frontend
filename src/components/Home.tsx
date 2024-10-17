import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaFileInvoiceDollar, FaChartBar, FaInfoCircle, FaUserPlus } from 'react-icons/fa';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: var(--color-dark-blue);
  text-align: center;
  margin-bottom: 30px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled(Link)`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  padding: 20px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2`
  font-size: 1.2em;
  margin: 0;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Bienvenido a la Gestión de Cartera</Title>
      <CardContainer>
        <Card to="/gestion-clientes">
          <CardIcon><FaUserPlus /></CardIcon>
          <CardTitle>Gestión de Clientes</CardTitle>
        </Card>
        <Card to="/registro-credito">
          <CardIcon><FaFileInvoiceDollar /></CardIcon>
          <CardTitle>Registro de Crédito</CardTitle>
        </Card>
        <Card to="/visualizacion-creditos">
          <CardIcon><FaChartBar /></CardIcon>
          <CardTitle>Visualización de Créditos</CardTitle>
        </Card>
        <Card to="/informacion-general">
          <CardIcon><FaInfoCircle /></CardIcon>
          <CardTitle>Información General</CardTitle>
        </Card>
        <Card to="/perfil-usuario">
          <CardIcon><FaUser /></CardIcon>
          <CardTitle>Perfil de Usuario</CardTitle>
        </Card>
      </CardContainer>
    </HomeContainer>
  );
};

export default Home;