import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/TCAL';

    // Connexion à la base de données sans les options obsolètes
    await mongoose.connect(mongoURI);
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    process.exit(1);
  }
};

export default connectDB;
