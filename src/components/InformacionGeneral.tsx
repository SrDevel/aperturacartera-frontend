import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styled from 'styled-components';
import { FaDownload, FaChartLine } from 'react-icons/fa';

const InfoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: var(--color-dark-blue);
  text-align: center;
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const InfoValue = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: var(--color-cream);
  color: var(--color-dark-blue);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0d0b8;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 10px;
`;

type InformacionGeneral = {
  totalClientes: number;
  totalCreditosAprobados: number;
  montoTotalCreditos: number;
  promedioMontoPorCredito: number;
  tasaInteresPromedio: number;
};

const InformacionGeneral: React.FC = () => {
  const [informacion, setInformacion] = useState<InformacionGeneral | null>(null);

  useEffect(() => {
    const fetchInformacion = async () => {
      try {
        // TODO: Conexión con el backend
        // const response = await axios.get('http://tu-api-backend/api/informacion-general', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setInformacion(response.data);
        
        // Datos temporales
        setInformacion({
          totalClientes: 100,
          totalCreditosAprobados: 50,
          montoTotalCreditos: 1000000,
          promedioMontoPorCredito: 20000,
          tasaInteresPromedio: 5.5
        });
      } catch (error) {
        console.error('Error al obtener la información general:', error);
      }
    };

    fetchInformacion();
  }, []);

  const generarPDF = () => {
    if (!informacion) return;

    const doc = new jsPDF();
    doc.text('Informe General de Créditos', 20, 20);
    
    const data = [
      ['Total de Clientes', informacion.totalClientes.toString()],
      ['Créditos Aprobados', informacion.totalCreditosAprobados.toString()],
      ['Monto Total de Créditos', `$${informacion.montoTotalCreditos.toFixed(2)}`],
      ['Promedio de Monto por Crédito', `$${informacion.promedioMontoPorCredito.toFixed(2)}`],
      ['Tasa de Interés Promedio', `${informacion.tasaInteresPromedio.toFixed(2)}%`]
    ];

    (doc as any).autoTable({
      startY: 30,
      head: [['Concepto', 'Valor']],
      body: data,
    });

    doc.save('informe-general-creditos.pdf');
  };

  if (!informacion) {
    return <div>Cargando información...</div>;
  }

  return (
    <InfoContainer>
      <Title>Información General</Title>
      <InfoCard>
        <InfoTitle>Total de Clientes</InfoTitle>
        <InfoValue>{informacion.totalClientes}</InfoValue>
      </InfoCard>
      <InfoCard>
        <InfoTitle>Créditos Aprobados</InfoTitle>
        <InfoValue>{informacion.totalCreditosAprobados}</InfoValue>
      </InfoCard>
      <InfoCard>
        <InfoTitle>Monto Total de Créditos</InfoTitle>
        <InfoValue>${informacion.montoTotalCreditos.toFixed(2)}</InfoValue>
      </InfoCard>
      <InfoCard>
        <InfoTitle>Promedio de Monto por Crédito</InfoTitle>
        <InfoValue>${informacion.promedioMontoPorCredito.toFixed(2)}</InfoValue>
      </InfoCard>
      <InfoCard>
        <InfoTitle>Tasa de Interés Promedio</InfoTitle>
        <InfoValue>{informacion.tasaInteresPromedio.toFixed(2)}%</InfoValue>
      </InfoCard>
      <Button onClick={generarPDF}>
        <ButtonIcon><FaDownload /></ButtonIcon>
        Generar Informe PDF
      </Button>
    </InfoContainer>
  );
};

export default InformacionGeneral;