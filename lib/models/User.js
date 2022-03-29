module.exports = class User {
  id;
  username;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.#passwordHash = row.password_hash;
  }
};
