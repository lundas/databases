var db = require('../db');

//getAll
// messages inner join rooms inner join users

module.exports = {
  getAll: function (callback) {
    db.connection.query(
      'SELECT users.name, messages.text, rooms.name FROM `messages` INNER JOIN `users` ON users.id = messages.id_users INNER JOIN `rooms` ON rooms.id = messages.id_rooms',
      (err, results, fields) => {
        if (err) {
          callback(err);
        }
        callback(null, results); //?
      }
    );
  }, // a function which produces all the messages
  create: function (username, message, roomname, callback) {
    db.connection.query(
      'SELECT `id` FROM `users` WHERE `name` = ?',
      [username],
      (err, results, fields) => {
        if (err) {
          callback(err);
        } else {
          let idUsersResults = results;
          db.connection.query(
            'SELECT `id` FROM `rooms` WHERE `name` = ?',
            [roomname],
            (err, results, fields) => {
              if (err) {
                callback(err);
              } else {
                db.connection.query(
                  'INSERT INTO `messages` (text, id_users, id_rooms) VALUES (?, ?, ?)',
                  [message, idUsersResults[0].id, results[0].id],
                  (err, results, fields) => {
                    if (err) {
                      callback (err);
                    } else {
                      callback(null, results);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } // a function which can be used to insert a message into the database
};
