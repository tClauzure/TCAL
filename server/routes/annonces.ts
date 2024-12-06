import express, { Request, Response } from 'express';
import Annonce, { IAnnonce } from '../models/Annonce';


const router = express.Router();

const TYPES_VALIDES = ['Séance de travail', 'Don']

// Route GET pour obtenir tous les annonces
router.get('/', async (req: Request, res: Response) => {
    try {
      const annonces = await Annonce.find();
      res.status(200).json(annonces);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
});

// Route POST pour créer un nouvel annonce
router.post('/', async (req: Request<{}, {}, IAnnonce>, res: Response): Promise<any> => {
    try {
      const { nom, description, createur, type, date } = req.body;
  
      // Validation des données
      if (!nom || !description || !createur || !type || !date) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      if (!TYPES_VALIDES.includes(type)) {
        return res.status(400).json({
            message: `Le type doit être l'une des valeurs suivantes : ${TYPES_VALIDES.join(', ')}.`,
        });
      }
  
  
      // Création d'un nouvel annonce
      const nouvelAnnonce = new Annonce({
        nom,
        description,
        createur,
        type,
        date,
      });
  
      // Sauvegarde dans la base de données
      const annonceCree = await nouvelAnnonce.save();
  
      res.status(201).json(annonceCree);
    } catch (error) {
      console.error('Erreur lors de la création de l’annonce :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
});

// Route PUT pour modifier un annonce existant
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<IAnnonce>>, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Vérifie si l'annonce existe
      const annonceExistant = await Annonce.findById(id);
      if (!annonceExistant) {
        res.status(404).json({ message: 'Annonce non trouvé.' });
        return;
      }

      // Validation des données
      if (updateData.type) {
        console.log('oui');
        if (!TYPES_VALIDES.includes(updateData.type)) {
            return res.status(400).json({
                message: `Le type doit être l'une des valeurs suivantes : ${TYPES_VALIDES.join(', ')}.`,
            });
        }
        
      }
  
      // Mise à jour de l'annonce
      const annonceModifie = await Annonce.findByIdAndUpdate(id, updateData, { new: true });
  
      res.status(200).json(annonceModifie);
    } catch (error) {
      console.error('Erreur lors de la modification de l’annonce :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
});

// Route DELETE pour supprimer un annonce existant
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      // Vérifie si l'annonce existe
      const annonceExistant = await Annonce.findById(id);
      if (!annonceExistant) {
        res.status(404).json({ message: 'annonce non trouvé.' });
        return;
      }
  
      // Suppression de l'annonce
      await Annonce.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'annonce supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l’annonce :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
});
  
  
  
export default router;
