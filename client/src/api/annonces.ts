import axios from 'axios';

const API_URL = 'http://localhost:5000/api/annonces'; // URL de vos routes backend

// Obtenir toutes les annonces
export const getAnnonces = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Créer une nouvelle annonce
export const createAnnonce = async (annonce: {
  nom: string;
  description: string;
  createur: string;
  type: string;
  date: string;
}) => {
  const response = await axios.post(API_URL, annonce);
  return response.data;
};

// Mettre à jour une annonce
export const updateAnnonce = async (id: string, data: Partial<typeof annonce>) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Supprimer une annonce
export const deleteAnnonce = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
