import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  ETUDIANT = 'etudiant',
  ECOLE = 'ecole'
}

export interface IUser extends Document {
  nom: string;
  email: string;
  password: string;
  role: Role;
}

const userSchema = new Schema<IUser>({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [Role.ETUDIANT, Role.ECOLE], required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
