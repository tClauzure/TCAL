import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

// Connexion avant les tests
beforeAll(async () => {
 // Remplace cette valeur par l'URI de test correct
 const TEST_MONGO_URI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/testDB';

 try {
   // Connexion à MongoDB
   await mongoose.connect(TEST_MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   console.log('Connecté à la base de données de test MongoDB.');

   // Démarrer le serveur
   server = (await import('../app')).default.listen(5001, () => {
     console.log('Serveur de test démarré sur le port 5001.');
   });
 } catch (error) {
   console.error('Erreur de connexion à la base de données de test:', error);
 }
});

// Déconnexion après les tests
afterAll(async () => {
  if (mongoose.connection.readyState === 1) { // Si la connexion est active
    await mongoose.connection.close();
    server.close();
  }
}, 10000);



