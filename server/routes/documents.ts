import express, { Request, Response } from 'express';
import Document from '../models/Documents';

const router = express.Router();

// Route GET pour obtenir tous les documents
router.get('/', async (req: Request, res: Response) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    // Type assertion pour indiquer que 'error' est de type Error
    res.status(500).json({ message: (error as Error).message });
  }
});

// Route POST pour créer un nouveau document
router.post('/', async (req: Request, res: Response) => {
  const document = new Document({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newDocument = await document.save();
    res.status(201).json(newDocument);
  } catch (error) {
    // Type assertion pour indiquer que 'error' est de type Error
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
