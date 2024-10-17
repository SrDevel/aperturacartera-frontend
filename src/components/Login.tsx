import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginForm = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      // TODO: Conexión con el backend
      // Descomentar y ajustar la URL cuando el backend esté listo
      // const response = await axios.post('http://api-backend/api/login', data);
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      //   navigate('/');
      // }

      // Código temporal para simular el inicio de sesión
      localStorage.setItem('token', "123445");
      navigate('/');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
      <div>
        <h1 >Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
              {...register('username', { required: 'Este campo es requerido' })}
              placeholder="Usuario"
          />
          {errors.username && <span>{errors.username.message}</span>}

          <input
              type="password"
              {...register('password', { required: 'Este campo es requerido' })}
              placeholder="Contraseña"
          />
          {errors.password && <span>{errors.password.message}</span>}

          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
  );
};

export default Login;