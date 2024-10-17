import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
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
  margin-top: 10px;

  &:hover {
    background-color: #2c3e50;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  margin-bottom: 10px;
`;

type UserProfile = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
};

type PasswordChange = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const PerfilUsuario: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { register: registerProfile, handleSubmit: handleSubmitProfile, setValue } = useForm<UserProfile>();
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors } } = useForm<PasswordChange>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Conexión con el backend
        // const response = await axios.get('http://tu-api-backend/api/perfil', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setProfile(response.data);
        
        // Datos temporales
        const tempProfile = {
          id: '1',
          nombre: 'Juan Pérez',
          email: 'juan@example.com',
          telefono: '1234567890'
        };
        setProfile(tempProfile);
        setValue('nombre', tempProfile.nombre);
        setValue('email', tempProfile.email);
        setValue('telefono', tempProfile.telefono);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmitProfile = async (data: UserProfile) => {
    try {
      // TODO: Conexión con el backend
      // await axios.put('http://tu-api-backend/api/perfil', data, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
      // Actualización temporal
      setProfile(data);
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const onSubmitPassword = async (data: PasswordChange) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    try {
      // TODO: Conexión con el backend
      // await axios.put('http://tu-api-backend/api/cambiar-password', {
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword
      // }, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
      // Simulación de éxito
      alert('Contraseña actualizada con éxito');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('Error al cambiar la contraseña');
    }
  };

  if (!profile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <ProfileContainer>
      <Title>Perfil de Usuario</Title>
      <Form onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <Input {...registerProfile('nombre')} placeholder="Nombre" />
        <Input {...registerProfile('email')} placeholder="Email" type="email" />
        <Input {...registerProfile('telefono')} placeholder="Teléfono" />
        <Button type="submit">Actualizar Perfil</Button>
      </Form>

      <Title>Cambiar Contraseña</Title>
      <Form onSubmit={handleSubmitPassword(onSubmitPassword)}>
        <Input 
          {...registerPassword('currentPassword', { required: 'Este campo es requerido' })} 
          type="password" 
          placeholder="Contraseña Actual" 
        />
        {errors.currentPassword && <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>}

        <Input 
          {...registerPassword('newPassword', { 
            required: 'Este campo es requerido',
            minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
          })} 
          type="password" 
          placeholder="Nueva Contraseña" 
        />
        {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}

        <Input 
          {...registerPassword('confirmNewPassword', { 
            required: 'Este campo es requerido',
            validate: (value, formValues) => value === formValues.newPassword || 'Las contraseñas no coinciden'
          })} 
          type="password" 
          placeholder="Confirmar Nueva Contraseña" 
        />
        {errors.confirmNewPassword && <ErrorMessage>{errors.confirmNewPassword.message}</ErrorMessage>}

        <Button type="submit">Cambiar Contraseña</Button>
      </Form>
    </ProfileContainer>
  );
};

export default PerfilUsuario;