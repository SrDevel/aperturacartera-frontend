import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
  clienteId: string;
  monto: number;
  plazo: number;
  tasaInteres: number;
};

const RegistroCredito: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistroCreditoForm>();

  const onSubmit = async (data: RegistroCreditoForm) => {
    try {
      // TODO: Conexión con el backend
      console.log('Datos de registro de crédito:', data);
    } catch (error) {
      console.error('Error en el registro de crédito:', error);
    }
  };

  return (
      <Container>
        <Title>Registro de Crédito</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
              {...register('clienteId', { required: 'Este campo es requerido' })}
              placeholder="ID del Cliente"
          />
          {errors.clienteId && <ErrorMessage>{errors.clienteId.message}</ErrorMessage>}

          <Input
              type="number"
              {...register('monto', { required: 'Este campo es requerido', min: { value: 0, message: 'El monto debe ser mayor o igual a 0' } })}
              placeholder="Monto"
          />
          {errors.monto && <ErrorMessage>{errors.monto.message}</ErrorMessage>}

          <Input
              type="number"
              {...register('plazo', { required: 'Este campo es requerido', min: { value: 1, message: 'El plazo debe ser mayor o igual a 1 mes' } })}
              placeholder="Plazo (en meses)"
          />
          {errors.plazo && <ErrorMessage>{errors.plazo.message}</ErrorMessage>}

          <Input
              type="number"
              step="0.01"
              {...register('tasaInteres', { required: 'Este campo es requerido', min: { value: 0, message: 'La tasa debe ser mayor o igual a 0' }, max: { value: 100, message: 'La tasa no puede ser mayor a 100%' } })}
              placeholder="Tasa de Interés (%)"
          />
          {errors.tasaInteres && <ErrorMessage>{errors.tasaInteres.message}</ErrorMessage>}

          <Button type="submit">Registrar Crédito</Button>
        </Form>
      </Container>
  );
};

export default RegistroCredito;
