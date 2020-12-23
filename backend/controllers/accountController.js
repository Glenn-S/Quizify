const { User } = require('../models/User');
const { accountValidator } = require('../validators/accountValidator');

/**
 * @param {import('express').Express} app 
 */
const accountController = (app) => {
  /**
   * 
   */
  app.get('/account', (req, res) => {
    User.find((err, users) => {
      if (err) {
        res.status(404).json({ error: err });
        return;
      }
  
      res.status(200).json({ users });
    });
  })
  
  /**
   * 
   */
  app.get('/account/:userId', (req, res) => {
    const { userId } = req.params;
  
    User.findById(userId, (err, user) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (user === null) {
        res.status(404).json({ error: `The user with user id: ${userId} could not be found` });
        return;
      }
  
      res.status(200).json({ user });
    });
  });
  
  // TODO create ability to edit user
  // PUT / PATCH
  
  /**
   * 
   */
  app.post('/account', (req, res) => {
    const { username, email } = req.body;
  
    const { isValid, validationError } = accountValidator(username, email);
  
    if (!isValid) {
      res.status(400).json({ error: validationError });
      return;
    }
  
    User.find({ email }, (emailErr, userWithEmail) => {
  
      if (emailErr) {
        res.status(500).json({ error: 'An error occured while trying to look the user up in the database. Please try again later.' });
        return;
      }
  
      if (userWithEmail.length > 0) {
        res.status(400).json({ error: `The user with the email: ${email} already exists` });
        return;
      }
  
      User.find({ username }, (usernameErr, userWithUsername) => {
        if (usernameErr) {
          res.status(500).json({ error: 'An error occured while trying to look the user up in the database. Please try again later.' });
          return;
        }
    
        if (userWithUsername.length > 0) {
          res.status(400).json({ error: `The user with the username: ${username} already exists` });
          return;
        }
  
        const newUser = new User({ username, email });
        newUser.save();
        
        res.status(201).json({ user: newUser });
      });
    });
  });
  
  /**
   * 
   */
  app.delete('/account/:userId', (req, res) => {
    const { userId } = req.params;
  
    User.findByIdAndDelete(userId, (err, result) => {
      console.log(err, result);
  
      if (err) {
        res.status(500).json({ error: err });
          return;
      }
  
      if (result === null) {
        res.status(404).json({ error: `The user with the id: ${userId} does not exist.` });
        return;
      }
  
      res.status(204).json();
    });
  });
};

module.exports = { accountController };