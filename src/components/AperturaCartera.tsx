import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type AperturaCarteraForm = {
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  monto: number;
  plazo: number;
  cuotas: number;
  email: string;
  telefono: string;
};

const AperturaCartera: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AperturaCarteraForm>();

  const onSubmit = async (data: AperturaCarteraForm) => {
    try {
      // TODO: Conexión con el backend
      // Descomentar y ajustar la URL cuando el backend esté listo
      // const response = await axios.post('http://tu-api-backend/api/apertura-cartera', data, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // console.log('Apertura de cartera exitosa:', response.data);
      
      // Código temporal
      console.log('Datos de apertura de cartera:', data);
    } catch (error) {
      console.error('Error en la apertura de cartera:', error);
    }
  };

  return (
    <div>
      <h1>Apertura de Cartera</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('nombres', { required: 'Este campo es requerido' })} placeholder="Nombres" />
        {errors.nombres && <span>{errors.nombres.message}</span>}
        
        <input {...register('apellidos', { required: 'Este campo es requerido' })} placeholder="Apellidos" />
        {errors.apellidos && <span>{errors.apellidos.message}</span>}
        
        <input {...register('documentoIdentidad', { required: 'Este campo es requerido' })} placeholder="Documento de Identidad" />
        {errors.documentoIdentidad && <span>{errors.documentoIdentidad.message}</span>}
        
        <input type="number" {...register('monto', { required: 'Este campo es requerido', min: 0 })} placeholder="Monto" />
        {errors.monto && <span>{errors.monto.message}</span>}
        
        <input type="number" {...register('plazo', { required: 'Este campo es requerido', min: 1 })} placeholder="Plazo" />
        {errors.plazo && <span>{errors.plazo.message}</span>}
        
        <input type="number" {...register('cuotas', { required: 'Este campo es requerido', min: 1 })} placeholder="Cuotas" />
        {errors.cuotas && <span>{errors.cuotas.message}</span>}
        
        <input type="email" {...register('email', { required: 'Este campo es requerido', pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
        
        <input {...register('telefono', { required: 'Este campo es requerido' })} placeholder="Teléfono" />
        {errors.telefono && <span>{errors.telefono.message}</span>}
        
        <button type="submit">Registrar Apertura de Cartera</button>
      </form>
    </div>
  );
};

export default AperturaCartera;