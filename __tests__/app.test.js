const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should sign up a new user via POST route', async () => {
    const res = await request(app).post('/api/v1/users').send({
      username: 'Trev',
      password: 'password',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Trev',
    });
  });

  it('logs in an existing user', async () => {
    const user = await UserService.signUp({
      username: 'Trev',
      password: 'password',
    });

    const res = await request(app).post('/api/v1/users/sessions').send({
      username: 'Trev',
      password: 'password',
    });

    expect(res.body).toEqual({
      message: 'Successfully signed in!',
      user,
    });
  });

  it('should sign out a user by deleting the cookie', async () => {
    await UserService.signUp({
      username: 'Trev',
      password: 'password',
    });

    const res = await request(app).delete('/api/v1/users/sessions');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });

  it('should protect routes using the authenticate middleware', async () => {
    const agent = request.agent(app);

    await UserService.signUp({
      username: 'Trev',
      password: 'secret',
    });

    let res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(401);
    console.log('response status: ', res.status);

    await agent.post('/api/v1/users/sessions').send({
      username: 'Trev',
      password: 'secret',
    });

    res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual([
      {
        id: '1',
        title: 'Top Secret',
        description: 'a super secret secret',
      },
    ]);
  });
});
