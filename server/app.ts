import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
//import routes from './routes'; // Assure-toi d'importer tes routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
//app.use('/api', routes); // Expose tes routes via `/api`

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
