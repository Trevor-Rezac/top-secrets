const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = [
      {
        id: '1',
        title: 'Top Secret',
        description: 'a super secret secret',
      },
    ];

    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
