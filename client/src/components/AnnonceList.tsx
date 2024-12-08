import React, { useEffect, useState } from 'react';
import { getAnnonces, createAnnonce, deleteAnnonce } from '../api/annonces';

const AnnonceList: React.FC = () => {
  const [annonces, setAnnonces] = useState<any[]>([]);

  // Charger les annonces au chargement du composant
  useEffect(() => {
    const fetchAnnonces = async () => {
      const data = await getAnnonces();
      setAnnonces(data);
    };
    fetchAnnonces();
  }, []);

  // Ajouter une annonce
  const handleAddAnnonce = async () => {
    const newAnnonce = {
      nom: 'Nouvelle Annonce',
      description: 'Ceci est une description.',
      createur: 'Test',
      type: 'Don',
      date: new Date().toISOString(),
    };
    const addedAnnonce = await createAnnonce(newAnnonce);
    setAnnonces([...annonces, addedAnnonce]);
  };

  // Supprimer une annonce
  const handleDeleteAnnonce = async (id: string) => {
    await deleteAnnonce(id);
    setAnnonces(annonces.filter((annonce) => annonce._id !== id));
  };

  return (
    <div>
      <h1>Liste des Annonces</h1>
      <button onClick={handleAddAnnonce}>Ajouter une annonce</button>
      <ul>
        {annonces.map((annonce) => (
          <li key={annonce._id}>
            {annonce.nom} - {annonce.type}
            <button onClick={() => handleDeleteAnnonce(annonce._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnonceList;
