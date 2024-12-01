import request from 'supertest';
import app from '../app';
import Evenement from '../models/Evenement';
import mongoose from 'mongoose';


describe('Tests pour /api/evenements', () => {

  it('devrait récupérer tous les événements', async () => {
    const response = await request('http://localhost:5000').get('/api/evenements');
    
    expect(response.status).toBe(200); // Vérifier que la réponse est OK
    expect(Array.isArray(response.body)).toBe(true); // Vérifier que le résultat est un tableau
  });

  // it('devrait retourner tous les événements', async () => {
  //   // Insérer des données fictives dans la base de données
  //   const evenementsFictifs = [
  //     { nom: 'Événement 1', description: 'Description 1', createur: 'Créateur 1' },
  //     { nom: 'Événement 2', description: 'Description 2', createur: 'Créateur 2' },
  //   ];
  //   await Evenement.insertMany(evenementsFictifs);

  //   // Faire une requête GET à /api/evenements
  //   const response = await request(app).get('/api/evenements');

  //   // Vérifier le statut HTTP
  //   expect(response.status).toBe(200);

  //   // Vérifier que la réponse contient les bons événements
  //   expect(response.body).toHaveLength(2); // Devrait retourner 2 événements
  //   expect(response.body).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({ nom: 'Événement 1', description: 'Description 1', createur: 'Créateur 1' }),
  //       expect.objectContaining({ nom: 'Événement 2', description: 'Description 2', createur: 'Créateur 2' }),
  //     ])
  //   );
  // });

  // it('devrait retourner une liste vide s’il n’y a pas d’événements', async () => {
  //   // Faire une requête GET à /api/evenements
  //   const response = await request(app).get('/api/evenements');

  //   // Vérifier que le statut est 200
  //   expect(response.status).toBe(200);

  //   // Vérifier que la réponse est un tableau vide
  //   expect(response.body).toEqual([]);
  // });
});
