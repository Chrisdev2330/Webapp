import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/usuarios', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; 
  }
};

export default { connect };