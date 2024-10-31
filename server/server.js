require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware pour JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connecté à MongoDB"))
    .catch((err) => console.log("Erreur de connexion :", err));

// Définissez une route simple pour tester
app.get('/', (req, res) => res.send('API Entraide Étudiants est en ligne'));

// Écoutez les requêtes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));