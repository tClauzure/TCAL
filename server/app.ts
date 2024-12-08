import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import evenementsRouter from './src/routes/evenements';
import annoncesRouter from './src/routes/annonces';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Adresse de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
}));
const PORT = process.env.BACK_PORT || 5000;

// Middleware
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Le serveur fonctionne !');
});
app.use('/api/evenements', evenementsRouter);
app.use('/api/annonces', annoncesRouter);

// Connexion à MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('La variable MONGO_URI est manquante dans le fichier .env');
}
mongoose.connect(mongoUri as string)
  .then(() => {
    console.log('Connecté à MongoDB')
    app.listen(PORT,() => {
      console.log(`serveur lancé sur le port ${PORT}`)
    });
  })
  .catch((error) => console.log(error));

export default app;