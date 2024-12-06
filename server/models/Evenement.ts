import mongoose, { Schema, Document } from 'mongoose';

export interface IEvenement extends Document {
  nom: string;
  description: string;
  createur: string;
  date: Date;
}

// Schéma Mongoose pour la collection Evenement
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
  date: {
    type: Date,
    required: true,
  }
});

// Créer le modèle basé sur le schéma
const Evenement = mongoose.model<IEvenement>('Evenement', EvenementSchema);

export default Evenement;
