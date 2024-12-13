import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  ETUDIANT = 'etudiant',
  GROUPE = 'groupe'
}

export interface IUtilisateur extends Document {
  nom: string;
  email: string;
  password: string;
  role: Role;
}

const utilisateurSchema = new Schema<IUtilisateur>({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  role: { type: String, enum: [Role.ETUDIANT, Role.GROUPE], required: true },
});

const Utilisateur = mongoose.model<IUtilisateur>('Utilisateur', utilisateurSchema);

export default Utilisateur;
