import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: var(--color-dark-blue);
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--color-dark-blue);
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }
`;

type ClienteForm = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  documentoIdentidad: string;
};

const AgregarCliente: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClienteForm>();

  const onSubmit = async (data: ClienteForm) => {
    try {
      // TODO: Conexión con el backend
      // const response = await axios.post('http://tu-api-backend/api/clientes', data, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // console.log('Cliente agregado:', response.data);
      
      // Simulación de éxito
      console.log('Cliente agregado:', data);
      alert('Cliente agregado con éxito');
      reset(); // Limpiar el formulario después de agregar
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      alert('Error al agregar el cliente');
    }
  };

  return (
    <Container>
      <Title>Agregar Nuevo Cliente</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          {...register('nombre', { required: 'Este campo es requerido' })} 
          placeholder="Nombre" 
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
        
        <Input 
          {...register('apellido', { required: 'Este campo es requerido' })} 
          placeholder="Apellido" 
        />
        {errors.apellido && <span>{errors.apellido.message}</span>}
        
        <Input 
          {...register('email', { 
            required: 'Este campo es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Dirección de email inválida"
            }
          })} 
          placeholder="Email" 
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}
        
        <Input 
          {...register('telefono', { required: 'Este campo es requerido' })} 
          placeholder="Teléfono" 
        />
        {errors.telefono && <span>{errors.telefono.message}</span>}
        
        <Input 
          {...register('documentoIdentidad', { required: 'Este campo es requerido' })} 
          placeholder="Documento de Identidad" 
        />
        {errors.documentoIdentidad && <span>{errors.documentoIdentidad.message}</span>}
        
        <Button type="submit">Agregar Cliente</Button>
      </Form>
    </Container>
  );
};

export default AgregarCliente;