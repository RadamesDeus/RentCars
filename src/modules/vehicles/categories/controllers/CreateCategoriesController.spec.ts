import request from 'supertest';
import { Connection } from 'typeorm';

import app from '../../../../app';
import StartAdmin from '../../../../database/typeorm/seed/StartAdmin';
import generete from '../../../../ultis/genereteText';

const startAdmin = new StartAdmin();
let createConnection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    const { connection } = await startAdmin.createUserAdmin('test');
    createConnection = connection;
  });
  afterAll(async () => {
    createConnection.dropDatabase();
    await startAdmin.closeConnection();
  });

  it('should be able to create a new category', async () => {
    const sessionUser = await request(app)
      .post('/users/sessions')
      .send({ email_username: 'admin', password: 'admin' });
    const { token } = sessionUser.body;

    const reponse = await request(app)
      .post('/categories')
      .send({ name: generete(), description: generete() })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(reponse.status).toBe(201);
  });
});
