import request from 'supertest';
import app from '../app';
import Utilisateur from '../models/Utilisateur';
import bcrypt from 'bcryptjs';

describe('Tests pour /api/utilisateurs', () => {
  beforeEach(async () => {
    // Nettoyer la collection avant chaque test
    await Utilisateur.deleteMany({});
  });

  it('devrait enregistrer un nouvel utilisateur', async () => {
    const utilisateur = {
      nom: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'etudiant',
    };

    const response = await request(app).post('/api/utilisateurs/register').send(utilisateur);

    expect(response.status).toBe(201); // Vérifie que l'utilisateur a été créé
    expect(response.body.message).toBe('Utilisateur enregistré avec succès');

    const utilisateurEnBase = await Utilisateur.findOne({ email: 'test@example.com' });
    expect(utilisateurEnBase).not.toBeNull();
  });
});

it('devrait connecter un utilisateur enregistré', async () => {
    const utilisateur = new Utilisateur({
      nom: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'etudiant',
    });
    await utilisateur.save();
  
    const response = await request(app).post('/api/utilisateurs/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.utilisateur).toMatchObject({
      nom: 'Test User',
      email: 'test@example.com',
      role: 'etudiant',
    });
  });
  