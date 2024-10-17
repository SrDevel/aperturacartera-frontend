import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAxios from '../lib/useAxios';

type LoginForm = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const axiosInstance = useAxios(); // Usar la instancia de Axios personalizada

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      if (response.data.token) {
        console.log('Inicio de sesión exitoso:', response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        console.error('Inicio de sesión fallido:', response.data);
        setErrorMessage('Inicio de sesión fallido. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage('Error de inicio de sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          {...register('username', { required: 'Este campo es requerido' })}
          placeholder="Usuario"
          className="login-input"
        />
        {errors.username && <span className="error-message">{errors.username.message}</span>}

        <input
          type="password"
          {...register('password', { required: 'Este campo es requerido' })}
          placeholder="Contraseña"
          className="login-input"
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}

        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Login;