import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import useAxios from '../lib/useAxios';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: #fbe5d1;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: var(--color-dark-blue);
  text-align: center;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px; 
  overflow: hidden;
`;

const Th = styled.th`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  padding: 10px;
  text-align: left;
  font-weight: bold;
  position: relative;

  &:hover {
    text-decoration: underline;
  }
`;

const Td = styled.td`
  border: 1px solid var(--color-dark-blue);
  padding: 10px;
  background-color: white; 
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1; 
  }
`;

const Button = styled.button`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px; 
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
    opacity: 0.9; 
  }
`;

const ButtonIcon = styled.span`
  margin-right: 5px;
`;

type Credito = {
  id: string;
  clientId: string;
  amount: number;
  term: number;
  interestRate: number;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado' | 'Pagado';
};

const VisualizacionCreditos: React.FC = () => {
  const [creditos, setCreditos] = useState<Credito[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        const response = await axiosInstance.get('/credits', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCreditos(response.data.content); // `response.data.content` si está paginado
      } catch (error) {
        console.error('Error al obtener los créditos:', error);
      }
    };

    fetchCreditos();
  }, []);

  const aprobarCredito = async (id: string) => {
    try {
      await axiosInstance.patch(`/credits/${id}/status?status=Aprobado`, 
        {}, // El cuerpo vacío
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      setCreditos(creditos.map(credito =>
        credito.id === id ? { ...credito, status: 'Aprobado' } : credito
      ));
    } catch (error) {
      console.error('Error al aprobar el crédito:', error);
    }
  };
  
  const rechazarCredito = async (id: string) => {
    try {
      await axiosInstance.patch(`/credits/${id}/status?status=Rechazado`, 
        {}, // El cuerpo vacío
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      setCreditos(creditos.map(credito =>
        credito.id === id ? { ...credito, status: 'Rechazado' } : credito
      ));
    } catch (error) {
      console.error('Error al rechazar el crédito:', error);
    }
  };
  

  const editarCredito = (id: string) => {
    setEditingId(id);
  };

  const guardarEdicion = async (id: string) => {
    try {
      const creditoEditado = creditos.find(c => c.id === id);
      if (!creditoEditado) return;

      await axiosInstance.put(`/credits/${id}`, creditoEditado, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setEditingId(null);
    } catch (error) {
      console.error('Error al guardar la edición del crédito:', error);
    }
  };

  const handleInputChange = (id: string, field: keyof Credito, value: string | number) => {
    setCreditos(creditos.map(credito =>
      credito.id === id ? { ...credito, [field]: value } : credito
    ));
  };

  return (
    <Container>
      <Title>Visualización de Créditos</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID Cliente</Th>
            <Th>Monto</Th>
            <Th>Plazo</Th>
            <Th>Tasa de Interés</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {creditos.map((credito) => (
            <tr key={credito.id}>
              <Td>{credito.clientId}</Td>
              <Td>
                {editingId === credito.id ? (
                  <input
                    type="number"
                    value={credito.amount}
                    onChange={(e) => handleInputChange(credito.id, 'amount', parseFloat(e.target.value))}
                    style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                  />
                ) : (
                  `$${credito.amount.toFixed(2)}`
                )}
              </Td>
              <Td>
                {editingId === credito.id ? (
                  <input
                    type="number"
                    value={credito.term}
                    onChange={(e) => handleInputChange(credito.id, 'term', parseInt(e.target.value))}
                    style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                  />
                ) : (
                  `${credito.term} meses`
                )}
              </Td>
              <Td>
                {editingId === credito.id ? (
                  <input
                    type="number"
                    step="0.1"
                    value={credito.interestRate}
                    onChange={(e) => handleInputChange(credito.id, 'interestRate', parseFloat(e.target.value))}
                    style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                  />
                ) : (
                  `${credito.interestRate}%`
                )}
              </Td>
              <Td>{credito.status}</Td>
              <Td>
                {credito.status === 'Pendiente' && (
                  <>
                    <Button onClick={() => aprobarCredito(credito.id)}>
                      <ButtonIcon><FaCheck /></ButtonIcon>
                      Aprobar
                    </Button>
                    <Button onClick={() => rechazarCredito(credito.id)}>
                      <ButtonIcon><FaTimes /></ButtonIcon>
                      Rechazar
                    </Button>
                  </>
                )}
                {editingId === credito.id ? (
                  <Button onClick={() => guardarEdicion(credito.id)}>
                    <ButtonIcon><FaCheck /></ButtonIcon>
                    Guardar
                  </Button>
                ) : (
                  <Button onClick={() => editarCredito(credito.id)}>
                    <ButtonIcon><FaEdit /></ButtonIcon>
                    Editar
                  </Button>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VisualizacionCreditos;
