import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
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
  margin-bottom: 20px;
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2c3e50;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: var(--color-dark-blue);
  color: var(--color-cream);
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid var(--color-dark-blue);
  padding: 10px;
`;

const ActionButton = styled(Button)`
  padding: 5px 10px;
  margin-right: 5px;
`;

type Cliente = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
};

const GestionClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Cliente>();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas autenticación
        }
      });
      setClientes(response.data.content); // Asumiendo que la API devuelve paginación con `content`
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const onSubmit = async (data: Cliente) => {
    try {
      if (editingId) {
        // Actualizar cliente
        await axios.put(`http://localhost:8080/clients/${editingId}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setClientes(clientes.map(cliente => cliente.id === editingId ? { ...data, id: editingId } : cliente));
        setEditingId(null);
      } else {
        // Crear nuevo cliente
        const response = await axios.post('http://localhost:8080/clients', data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const nuevoCliente = response.data;
        setClientes([...clientes, nuevoCliente]);
      }
      reset();
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }
  };

  const eliminarCliente = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await axios.delete(`http://localhost:8080/clients/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setClientes(clientes.filter(cliente => cliente.id !== id));
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };


  return (
    <Container>
      <Title>Gestión de Clientes</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name')} placeholder="Nombre" required />
        <Input {...register('lastName')} placeholder="Apellido" required />
        <Input {...register('email')} placeholder="Email" type="email" required />
        <Input {...register('phone')} placeholder="Teléfono" required />
        <Input {...register('dni')} placeholder="Documento de Identidad" required />
        <Button type="submit">
          <ButtonIcon>{editingId ? <FaEdit /> : <FaUserPlus />}</ButtonIcon>
          {editingId ? 'Actualizar Cliente' : 'Agregar Cliente'}
        </Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Email</Th>
            <Th>Teléfono</Th>
            <Th>Documento</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <Td>{cliente.name}</Td>
              <Td>{cliente.lastName}</Td>
              <Td>{cliente.email}</Td>
              <Td>{cliente.phone}</Td>
              <Td>{cliente.dni}</Td>
              <Td>
                <ActionButton onClick={() => {
                  setEditingId(cliente.id);
                  setValue('name', cliente.name);
                  setValue('lastName', cliente.lastName);
                  setValue('email', cliente.email);
                  setValue('phone', cliente.phone);
                  setValue('dni', cliente.dni);
                }
                }>
                  <FaEdit />
                </ActionButton>
                <ActionButton onClick={() => eliminarCliente(cliente.id)}>
                  <FaTrash />
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionClientes;