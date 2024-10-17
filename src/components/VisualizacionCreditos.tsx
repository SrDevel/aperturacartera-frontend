import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

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
  clienteId: string;
  monto: number;
  plazo: number;
  tasaInteres: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
};

const VisualizacionCreditos: React.FC = () => {
  const [creditos, setCreditos] = useState<Credito[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        // TODO: Conexión con el backend
        // const response = await axios.get('http://tu-api-backend/api/creditos', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setCreditos(response.data);

        // Datos temporales
        setCreditos([
          { id: '1', clienteId: 'C001', monto: 5000, plazo: 12, tasaInteres: 5, estado: 'PENDIENTE' },
          { id: '2', clienteId: 'C002', monto: 10000, plazo: 24, tasaInteres: 4.5, estado: 'APROBADO' },
        ]);
      } catch (error) {
        console.error('Error al obtener los créditos:', error);
      }
    };

    fetchCreditos();
  }, []);

  const aprobarCredito = async (id: string) => {
    try {
      // TODO: Conexión con el backend
      // await axios.put(`http://tu-api-backend/api/creditos/${id}/aprobar`, {}, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // Actualización temporal
      setCreditos(creditos.map(credito =>
          credito.id === id ? { ...credito, estado: 'APROBADO' } : credito
      ));
    } catch (error) {
      console.error('Error al aprobar el crédito:', error);
    }
  };

  const rechazarCredito = async (id: string) => {
    try {
      // TODO: Conexión con el backend
      // await axios.put(`http://tu-api-backend/api/creditos/${id}/rechazar`, {}, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // Actualización temporal
      setCreditos(creditos.map(credito =>
          credito.id === id ? { ...credito, estado: 'RECHAZADO' } : credito
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

      // TODO: Conexión con el backend
        // await axios.put(`http://tu-api-backend/api/creditos/${id}`, creditoEditado, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

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
                <Td>{credito.clienteId}</Td>
                <Td>
                  {editingId === credito.id ? (
                      <input
                          type="number"
                          value={credito.monto}
                          onChange={(e) => handleInputChange(credito.id, 'monto', parseFloat(e.target.value))}
                          style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                      />
                  ) : (
                      `$${credito.monto.toFixed(2)}`
                  )}
                </Td>
                <Td>
                  {editingId === credito.id ? (
                      <input
                          type="number"
                          value={credito.plazo}
                          onChange={(e) => handleInputChange(credito.id, 'plazo', parseInt(e.target.value))}
                          style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                      />
                  ) : (
                      `${credito.plazo} meses`
                  )}
                </Td>
                <Td>
                  {editingId === credito.id ? (
                      <input
                          type="number"
                          step="0.1"
                          value={credito.tasaInteres}
                          onChange={(e) => handleInputChange(credito.id, 'tasaInteres', parseFloat(e.target.value))}
                          style={{ width: '100%', border: 'none', outline: 'none', padding: '5px', borderRadius: '5px' }}
                      />
                  ) : (
                      `${credito.tasaInteres}%`
                  )}
                </Td>
                <Td>{credito.estado}</Td>
                <Td>
                  {credito.estado === 'PENDIENTE' && (
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
