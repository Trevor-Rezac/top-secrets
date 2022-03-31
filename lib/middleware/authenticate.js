const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('request cookies: ', req.cookies);
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log('cookie:', cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    console.log('payload: ', payload);
    req.user = payload;

    next();
  } catch (error) {
    error.message = 'Say Something else literally';
    error.status = 401;
    next(error);
  }
};
