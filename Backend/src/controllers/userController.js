import User from '../models/User.js';
import { encryptPassword } from '../utils/cryptoUtils.js';
import { z } from 'zod';

const userSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  apellido: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
  correo: z.string().email('Correo electrónico inválido'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit; 
    const users = await User.find().skip(skip).limit(limit); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const { contrasena } = validatedData;
    const encryptedPassword = encryptPassword(contrasena);
    const user = await User.create({
      ...validatedData,
      contrasena: encryptedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const { contrasena } = validatedData;
    const encryptedPassword = encryptPassword(contrasena);
    await User.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, contrasena: encryptedPassword },
      { new: true } 
    );
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };