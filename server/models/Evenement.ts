import mongoose, { Schema, Document } from 'mongoose';

interface IEvenement extends Document {
  nom: string;
  description: string;
  createur: string; 
}

// Schéma Mongoose pour la collection Evenements
const EvenementSchema: Schema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createur: {
    type: String,
    required: true,
  },
});

// Créer le modèle basé sur le schéma
const Evenement = mongoose.model<IEvenement>('Evenement', EvenementSchema);

export default Evenement;
