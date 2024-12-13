import express, { Request, Response } from 'express';
import Evenement,{IEvenement} from '../models/Evenement';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { Role } from '../models/Utilisateur';

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
router.post('/', authMiddleware, roleMiddleware([Role.GROUPE]), async (req: Request<{}, {}, IEvenement>, res: Response): Promise<any> => {
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

// Route PUT pour modifier un événement existant
router.put('/:id', authMiddleware, roleMiddleware([Role.GROUPE]), async (req: Request<{ id: string }, {}, Partial<IEvenement>>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Vérifie si l'événement existe
    const evenementExistant = await Evenement.findById(id);
    if (!evenementExistant) {
      res.status(404).json({ message: 'Événement non trouvé.' });
      return;
    }

    // Mise à jour de l'événement
    const evenementModifie = await Evenement.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(evenementModifie);
  } catch (error) {
    console.error('Erreur lors de la modification de l’événement :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});

// Route DELETE pour supprimer un événement existant
router.delete('/:id', authMiddleware, roleMiddleware([Role.GROUPE]), async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Vérifie si l'événement existe
    const evenementExistant = await Evenement.findById(id);
    if (!evenementExistant) {
      res.status(404).json({ message: 'Événement non trouvé.' });
      return;
    }

    // Suppression de l'événement
    await Evenement.findByIdAndDelete(id);

    res.status(200).json({ message: 'Événement supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’événement :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});



export default router;
