import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import Swal from 'sweetalert2';

interface RegisterFormProps {
  closeModal: () => void;
  userToUpdate: any | null;
  isUpdating?: boolean;
  onUserUpdated: () => void;
  onUserCreated: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeModal, userToUpdate, isUpdating, onUserUpdated, onUserCreated }) => {
  const { createUser, updateUser } = useUserStore();
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
  });

  useEffect(() => {
    if (userToUpdate) {
      setUserData(userToUpdate);
    } else {
      setUserData({ nombre: '', apellido: '', correo: '', contrasena: '' });
    }
  }, [userToUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (userData.nombre.length < 3) {
      Swal.fire('Error', 'El nombre debe tener al menos 3 caracteres', 'error');
      return;
    }
    if (userData.apellido.length < 3) {
      Swal.fire('Error', 'El apellido debe tener al menos 3 caracteres', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.correo)) {
      Swal.fire('Error', 'Correo electrónico inválido', 'error');
      return;
    }
    if (!isUpdating && userData.contrasena.length < 6) { 
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    try {
      if (isUpdating) {
        await updateUser(userToUpdate._id, userData);
        onUserUpdated(); 
        Swal.fire('¡Usuario actualizado!', 'El usuario ha sido actualizado con éxito.', 'success');
      } else {
        await createUser(userData);
        onUserCreated(); 
        Swal.fire('¡Usuario creado!', 'El usuario ha sido creado con éxito.', 'success');
      }
      closeModal();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el usuario. Inténtalo de nuevo.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">
        {isUpdating ? 'Actualizar usuario' : 'Registrar usuario'}
      </h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={userData.nombre}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={userData.apellido}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="correo" className="block text-gray-700 font-bold mb-2">
          Correo
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={userData.correo}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contrasena" className="block text-gray-700 font-bold mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={userData.contrasena}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required={!isUpdating} 
        />
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isUpdating ? 'Actualizar' : 'Registrar'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;