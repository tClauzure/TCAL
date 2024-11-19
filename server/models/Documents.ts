import mongoose, { Schema, Document } from 'mongoose';

// Interface pour un Document
export interface IDocument extends Document {
  title: string;
  content: string;
}

// Définition du schéma du document
const documentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Création du modèle basé sur le schéma
const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);

export default DocumentModel;