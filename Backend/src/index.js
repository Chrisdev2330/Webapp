
import bodyParser from 'body-parser';
import app from './app.js';
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises'; 

async function startServer() {
  try {
    const swaggerSpec = JSON.parse(await fs.readFile('./swagger.json', 'utf8'));  

   
    app.use(bodyParser.json());

    
    app.use('/api/users', userRoutes);

    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    
    await db.connect();  
    app.listen(3001, () => {
      console.log('Servidor en ejecución en el puerto 3001');
    });

  } catch (err) {
    console.error('Error starting server:', err);
  }
}


startServer();