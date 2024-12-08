import mongoose, { Schema } from "mongoose";

export interface IAnnonce extends Document {
    nom: string;
    description: string;
    createur: string;
    type: 'Séance de travail' | 'Don';
    date: string;
}

// Schéma Mongoose pour la collection Annonce
const AnnonceSchema: Schema = new Schema({
    nom: {
        type:String,
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    createur: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Séance de travail', 'Don'],
        require: true
    },
    date: {
        type: Date,
        required: true,
    }
});

// Créer le modèle basé sur le schéma
const Annonce = mongoose.model<IAnnonce>('Annonce', AnnonceSchema);

export default Annonce;

