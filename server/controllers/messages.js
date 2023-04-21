var models = require('../models');

module.exports = {
  get: function (req, res) {
    // invoke models.messages.getAll with info from req
    // send data in response with express methods
    models.messages.getAll((err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(results);
      }
    });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(
      req.body.username,
      req.body.message,
      req.body.roomname,
      (err, results) => {
        if (err) {
          console.log('messages.post err:', err);
          res.sendStatus(400);
        } else {
          res.status(201).json(results); // format in model correct?
        }
      });
  }, // a function which handles posting a message to the database
  options: function(req, res) {
    res.sendStatus(204);
  }
};