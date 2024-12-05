import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import evenementsRouter from './routes/evenements';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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