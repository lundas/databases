var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.connection.query(
      'SELECT * FROM users',
      (err, results, fields) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      }
    );

  },
  create: function (username, callback) {
    // INSERT INTO users (name) VALUES (username)
    db.connection.query(
      'INSERT INTO users (name) VALUES (?)',
      [username],
      (err, results, fields) => {
        if (err) {
          callback(err); // revisit
        } else {
          callback(null, results);
        }
      }
    );
  }
};
