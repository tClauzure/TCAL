 // tests/integration.test.js
 const mongoose = require('mongoose');
 const request = require('supertest');
 const app = require('../app');
 
 // Avant de commencer les tests, connectez-vous à une base de données de test
 beforeAll(async () => {
   await mongoose.connect('mongodb://admin:admin@localhost:27017/TCAL_test?authSource=admin', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
 });
 
 afterAll(async () => {
   // Fermer la connexion à la base de données après les tests
   await mongoose.connection.close();
 });
 
 describe('Test des routes avec base de données', () => {
   it('Devrait insérer et récupérer un document de la base de données', async () => {
     const newDocument = { title: 'Test Document', content: 'Test Content' };
     const postResponse = await request(app)
       .post('/api/documents')
       .send(newDocument);
     
     expect(postResponse.statusCode).toBe(201);
     expect(postResponse.body.title).toBe('Test Document');
 
     const getResponse = await request(app).get('/api/documents');
     expect(getResponse.statusCode).toBe(200);
     expect(getResponse.body).toContainEqual(
       expect.objectContaining({ title: 'Test Document' })
     );
   });
 });