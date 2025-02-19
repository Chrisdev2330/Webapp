import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import RegisterForm from './RegisterForm';
import DetailModal from './DetailModal';
import Swal from 'sweetalert2';
import { CSSTransition } from 'react-transition-group';

const UserTable: React.FC = () => {
  const { users, loading, error, fetchUsers, deleteUser } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const usersPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<any | null>(null);
  const [userToView, setUserToView] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage);
  }, [fetchUsers, currentPage]);

  useEffect(() => {
    const filterUsers = () => {
      if (!searchTerm) {
        return users;
      }

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return users.filter((user) => {
        const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
        return (
          user.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.apellido.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.correo.toLowerCase().includes(lowerCaseSearchTerm) ||
          fullName.includes(lowerCaseSearchTerm)
        );
      });
    };

    setFilteredUsers(filterUsers());
  }, [searchTerm, users]);

  useEffect(() => {
    if (users.length > 0) {
      setTotalPages(Math.ceil(users.length / usersPerPage));
    }
  }, [users]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateUser = (user: any) => {
    setUserToUpdate(user);
    setUserToView(null);
    setIsModalOpen(true);
  };

  const handleViewUser = (user: any) => {
    setUserToView(user);
    setUserToUpdate(null);
    setShowDetailsModal(true);
  };

  const handleUserUpdated = async () => {
    await fetchUsers(currentPage, usersPerPage);
  };

  const handleUserCreated = async () => {
    await fetchUsers(currentPage, usersPerPage);
  };

  const handleDeleteUser = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          Swal.fire('¡Usuario eliminado!', 'El usuario ha sido eliminado con éxito.', 'success');
          fetchUsers(currentPage, usersPerPage);
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>

      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">Lista de Usuarios</h1>
          <input
            type="text"
            placeholder="Buscar..."
            className="rounded-md px-3 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <div className="container mx-auto p-4">
  
        <div className="flex justify-end mb-4">
          <button onClick={() => { setIsModalOpen(true); setUserToUpdate(null); setUserToView(null); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            
            Registrar usuario
          </button>
        </div>

        
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="border px-4 py-2">{user.nombre}</td>
                <td className="border px-4 py-2">{user.apellido}</td>
                <td className="border px-4 py-2">{user.correo}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button onClick={() => handleViewUser(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ver detalles
                  </button>
                  <button onClick={() => handleUpdateUser(user)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Actualizar
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <RegisterForm
                closeModal={() => setIsModalOpen(false)}
                userToUpdate={userToUpdate}
                isUpdating={userToUpdate !== null}
                onUserUpdated={handleUserUpdated} 
                onUserCreated={handleUserCreated} 
              />
            </div>
          </div>
        )}


        {showDetailsModal && userToView && (
          <CSSTransition
            in={showDetailsModal}
            timeout={500}
            classNames="modal-transition"
            unmountOnExit
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <DetailModal user={userToView} onClose={() => setShowDetailsModal(false)} />
              </div>
            </div>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default UserTable;