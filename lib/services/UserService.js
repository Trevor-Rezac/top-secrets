const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  static async signUp({ username, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    return User.insert({
      username,
      passwordHash,
    });
  }

  static async signIn({ username, password }) {
    const user = await User.getByUsername(username);
    if (!user) throw new Error('invalid username/password');

    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('invalid username/password');

    return user;
  }
};
