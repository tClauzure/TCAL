import express, { Request, Response } from 'express';
import Evenement from '../models/Evenement';

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
router.post('/', async (req: Request, res: Response) => {
  const { nom, description, createur } = req.body;

  const nouvelEvenement = new Evenement({
    nom,
    description,
    createur,
  });

  try {
    const evenementCree = await nouvelEvenement.save();
    res.status(201).json(evenementCree);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
