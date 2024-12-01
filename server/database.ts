import mongoose from 'mongoose';

let isConnected = false;
const connectDB = async () => {
  try {
    if (isConnected) {
      console.log('Déjà connecté à MongoDB');
      return;
    }

    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/TCAL';
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    process.exit(1);
  }
};

export default connectDB;
