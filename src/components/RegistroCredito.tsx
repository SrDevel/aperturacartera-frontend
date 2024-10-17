import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin: 100px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.2rem;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  margin-top: -15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  text-align: left;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 12px 18px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #0056b3;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
`;

type RegistroCreditoForm = {
  clienteId: number;
  amount: number;
  interestRate: number;
  term: number;
  fees: number;
};

type Cliente = {
  id: string;
  name: string;
  userName: string;
  dni: string;
};

const RegistroCredito: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistroCreditoForm>();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('/clients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data && Array.isArray(response.data.content)) {
          setClientes(response.data.content);
        } else {
          console.error('La respuesta de la API no contiene un array válido:', response.data);
          setClientes([]);
        }
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
        setClientes([]);
      }
    };

    fetchClientes();
  }, []);

  const onSubmit = async (data: RegistroCreditoForm) => {
    try {
      const response = await axios.post('/credits', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setClientes([...clientes, response.data]);
      console.log('Datos de registro de crédito:', data);
    } catch (error) {
      console.error('Error en el registro de crédito:', error);
    }
  };

  return (
    <Container>
      <Title>Registro de Crédito</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select {...register('clienteId', { required: 'Este campo es requerido' })}>
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.name} {cliente.userName} - {cliente.dni}
            </option>
          ))}
        </Select>
        {errors.clienteId && <ErrorMessage>{errors.clienteId.message}</ErrorMessage>}

        <Input
          type="number"
          {...register('amount', { required: 'Este campo es requerido', min: { value: 0, message: 'El monto debe ser mayor a 0' } })}
          placeholder="Monto"
        />
        {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}

        <Input
          type="number"
          {...register('interestRate', { required: 'Este campo es requerido', min: { value: 0, message: 'La tasa debe ser mayor a 0' }, max: { value: 100, message: 'La tasa no puede ser mayor a 100%' } })}
          placeholder="Tasa de Interés (%)"
        />
        {errors.interestRate && <ErrorMessage>{errors.interestRate.message}</ErrorMessage>}

        <Input
          type="number"
          {...register('term', { required: 'Este campo es requerido', min: { value: 1, message: 'El plazo debe ser mayor a 1 mes' } })}
          placeholder="Plazo (en meses)"
        />
        {errors.term && <ErrorMessage>{errors.term.message}</ErrorMessage>}

        <Input
          type="number"
          {...register('fees', { required: 'Este campo es requerido', min: { value: 0, message: 'Las cuotas deben ser mayor a 0' } })}
          placeholder="Cuotas"
        />
        {errors.fees && <ErrorMessage>{errors.fees.message}</ErrorMessage>}

        <Button type="submit">Registrar Crédito</Button>
      </Form>
    </Container>
  );
};

export default RegistroCredito;