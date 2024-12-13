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

  import User, { Role, TypeGroupe } from '../models/Utilisateur';

describe('Validation du modèle Utilisateur', () => {
  it('devrait valider un étudiant', async () => {
    const etudiant = new User({
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      password: 'password123',
      role: Role.ETUDIANT
    });
    await expect(etudiant.save()).resolves.not.toThrow();
  });

  it('devrait valider une association', async () => {
    const association = new User({
      nom: 'Association Sportive',
      email: 'association@example.com',
      password: 'password123',
      role: Role.GROUPE,
      typeGroupe: TypeGroupe.ASSOCIATION,
      nomGerant: 'Pierre Martin',
      nombreMembres: 20
    });
    await expect(association.save()).resolves.not.toThrow();
  });

  it('devrait rejeter une association sans nom de gérant', async () => {
    const association = new User({
      nom: 'Association Sportive',
      email: 'association@example.com',
      password: 'password123',
      role: Role.GROUPE,
      typeGroupe: TypeGroupe.ASSOCIATION,
      nombreMembres: 20
    });
    await expect(association.save()).rejects.toThrow('Le nom du gérant est requis pour les associations');
  });

  it('devrait valider une école', async () => {
    const ecole = new User({
      nom: 'École ABC',
      email: 'ecole@example.com',
      password: 'password123',
      role: Role.GROUPE,
      typeGroupe: TypeGroupe.ECOLE
    });
    await expect(ecole.save()).resolves.not.toThrow();
  });
});

  