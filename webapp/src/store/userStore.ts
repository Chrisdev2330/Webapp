import { create } from 'zustand';
import axios from 'axios';

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  __v: number;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number, limit: number) => Promise<void>;
  createUser: (userData: any) => Promise<any>;
  updateUser: (id: string, userData: any) => Promise<any>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async (page, limit) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        params: { page, limit },
      });
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al cargar los usuarios' });
    }
  },
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, userData);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'Error al crear el usuario' });
      throw error;
    }
  },
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${id}`,
        userData
      );
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'Error al actualizar el usuario' });
      throw error;
    }
  },
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      set({ loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al eliminar el usuario' });
      throw error;
    }
  },
}));