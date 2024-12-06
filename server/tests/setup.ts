import mongoose from 'mongoose';
import connectDB  from '../database';
import app from '../app';
import { Server } from 'http';

let server: Server;

// Connexion avant les tests
beforeAll(async () => {
  process.env.PORT = '5000'; // Spécifie un port pour le serveur de test
  server = app.listen(5000, () => {
    console.log(`Serveur de test démarré sur le port ${process.env.PORT}`);
  });
  await connectDB();
});

// Déconnexion après les tests
afterAll(async () => {
  if (mongoose.connection.readyState === 1) { // Si la connexion est active
    await mongoose.connection.close();
    server.close();
  }
}, 10000);



