const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
