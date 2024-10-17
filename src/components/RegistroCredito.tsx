import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
      // Descomentar y ajustar la URL cuando el backend esté listo
      // const response = await axios.post('http://tu-api-backend/api/registro-credito', data, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // console.log('Registro de crédito exitoso:', response.data);
      
      // Código temporal
      console.log('Datos de registro de crédito:', data);
    } catch (error) {
      console.error('Error en el registro de crédito:', error);
    }
  };

  return (
    <div>
      <h1>Registro de Crédito</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('clienteId', { required: 'Este campo es requerido' })} placeholder="ID del Cliente" />
        {errors.clienteId && <span>{errors.clienteId.message}</span>}
        
        <input type="number" {...register('monto', { required: 'Este campo es requerido', min: 0 })} placeholder="Monto" />
        {errors.monto && <span>{errors.monto.message}</span>}
        
        <input type="number" {...register('plazo', { required: 'Este campo es requerido', min: 1 })} placeholder="Plazo (en meses)" />
        {errors.plazo && <span>{errors.plazo.message}</span>}
        
        <input type="number" step="0.01" {...register('tasaInteres', { required: 'Este campo es requerido', min: 0, max: 100 })} placeholder="Tasa de Interés (%)" />
        {errors.tasaInteres && <span>{errors.tasaInteres.message}</span>}
        
        <button type="submit">Registrar Crédito</button>
      </form>
    </div>
  );
};

export default RegistroCredito;