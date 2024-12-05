import express, { Request, Response } from 'express';
import Evenement,{IEvenement} from '../models/Evenement';

const router = express.Router();

// Route GET pour obtenir tous les événements
router.get('/', async (req: Request, res: Response) => {
  try {
    const evenements = await Evenement.find();
    res.status(200).json(evenements);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Route POST pour créer un nouvel événement
router.post('/', async (req: Request<{}, {}, IEvenement>, res: Response): Promise<any> => {
  try {
    const { nom, description, createur, date } = req.body;

    // Validation des données
    if (!nom || !description || !createur || !date) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }


    // Création d'un nouvel événement
    const nouvelEvenement = new Evenement({
      nom,
      description,
      createur,
      date,
    });

    // Sauvegarde dans la base de données
    const evenementCree = await nouvelEvenement.save();

    res.status(201).json(evenementCree);
  } catch (error) {
    console.error('Erreur lors de la création de l’événement :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});

export default router;
