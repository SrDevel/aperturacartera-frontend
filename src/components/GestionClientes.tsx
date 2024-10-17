import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--color-dark-blue);
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--color-dark-blue);
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background-color: var(--color-dark-blue);
  color: white;
  padding: 12px;
  width: 100%;
  max-width: 200px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2c3e50;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 8px;
`;

const Table = styled.table`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: var(--color-dark-blue);
  color: white;
  padding: 12px;
  text-align: left;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const Td = styled.td`
  border: 1px solid var(--color-dark-blue);
  padding: 12px;
  text-align: left;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const ActionButton = styled(Button)`
  padding: 8px 12px;
  margin-right: 5px;
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setClientes(response.data.content);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const onSubmit = async (data: Cliente) => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/clients/${editingId}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setClientes(clientes.map(cliente => cliente.id === editingId ? { ...data, id: editingId } : cliente));
        setEditingId(null);
      } else {
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
