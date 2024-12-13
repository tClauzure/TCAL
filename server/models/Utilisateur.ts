import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  ETUDIANT = 'etudiant',
  GROUPE = 'groupe'
}

export enum TypeGroupe {
  ASSOCIATION = 'association',
  ECOLE = 'ecole'
}

export interface IUtilisateur extends Document {
  nom: string;
  email: string;
  password: string;
  role: Role;
  typeGroupe?: TypeGroupe;
  nomPresident?: mongoose.Schema.Types.ObjectId;    
  nombreMembres?: number;
}

const utilisateurSchema = new Schema<IUtilisateur>({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true},
  role: { type: String, enum: [Role.ETUDIANT, Role.GROUPE], required: true },
  typeGroupe: {
    type: String,
    enum: [TypeGroupe.ASSOCIATION, TypeGroupe.ECOLE],
    required: function () {
      return this.role === Role.GROUPE;
    },
  },
  nomPresident: {
    type: Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: function (this: IUtilisateur) {
      return this.typeGroupe === TypeGroupe.ASSOCIATION;
    },
  },
  nombreMembres: {
    type: Number,
    validate: {
      validator: function (this: IUtilisateur) {
        return this.typeGroupe === TypeGroupe.ASSOCIATION ? this.nombreMembres && this.nombreMembres > 0 : true;
      },
      message: 'Le nombre de membres doit être supérieur à 0 pour les associations'
    }
  }
});

const Utilisateur = mongoose.model<IUtilisateur>('Utilisateur', utilisateurSchema);

export default Utilisateur;
