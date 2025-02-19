import React from 'react';

interface DetailModalProps {
  user: any;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Detalles de Usuario</h2>
        <div className="mb-4">
          <p><strong>Nombre:</strong> {user.nombre}</p>
        </div>
        <div className="mb-4">
          <p><strong>Apellido:</strong> {user.apellido}</p>
        </div>
        <div className="mb-4">
          <p><strong>Correo:</strong> {user.correo}</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;