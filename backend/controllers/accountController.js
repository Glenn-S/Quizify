const mongoose = require('mongoose');
const { AccountSettings } = require('../models/AccountSettings');

/**
 * @param {import('express').Express} app 
 */
const accountController = (app) => {
  /**
   * 
   */
  app.get('/account', (req, res) => {
    AccountSettings.find((err, accounts) => {
      if (err) {
        res.status(404).json({ error: err });
        return;
      }

      res.status(200).json({ accounts });
    });
  });
  
  /**
   * 
   */
  app.get('/account/:accountId', (req, res) => {
    const { accountId } = req.params;
    const { isGoogleId } = req.query;

    if (isGoogleId) {
      AccountSettings.findOne({ googleId: accountId }, (err, account) => {
        if (err) {
          res.status(500).json({ error: err });
          return
        }

        if (account === null) {
          res.status(404).json({ error: `The account with the google id: ${accountId} could not be found` });
          return;
        }

        res.status(200).json({ account });
      });
    }
    else {
      AccountSettings.findById(mongoose.Types.ObjectId(accountId), (err, account) => {
        if (err) {
          res.status(500).json({ error: err });
          return
        }

        if (account === null) {
          res.status(404).json({ error: `The quiz with id: ${accountId} could not be found` });
          return;
        }

        res.status(200).json({ account });
      });
    }
  });
  
  // TODO create ability to edit user
  // PUT / PATCH
  app.patch('/account/:accountId', (req, res) => {
    const { accountId } = req.params;
    const { theme } = req.body;

    AccountSettings.updateOne({ _id: accountId }, { theme }, (err, account) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      if (account === null) {
        res.status(404).json({ error: `The account with the id ${accountId} could not be found to be updated.` });
        return;
      }

      AccountSettings.findById(accountId, (e, updatedAccount) => {
        if (e) {
          res.status(500).json({ error: e });
          return;
        }

        if (updatedAccount === null) {
          res.status(404).json({ error: `The account with the id ${accountId} could not be found after updating.` });
          return;
        }

        res.status(206).json({ account: updatedAccount });
      });
    });
  });
  
  /**
   * 
   */
  app.post('/account', (req, res) => {
    const { googleId, theme } = req.body;
    const newAccount = new AccountSettings({
      googleId: googleId,
      theme: theme
    });

    AccountSettings.findOne({ googleId: googleId }, (err, account) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      if (account !== null) {
        res.status(400).json({ error: `A user with the google id ${googleId} already exists` });
        return;
      }

      newAccount.save((e, account) => {
        if (e) {
          res.status(500).json({ error: e });
          return;
        }
  
        res.status(201).json({ account });
      });
    });
  });
  
  /**
   * 
   */
  app.delete('/account/:accountId', (req, res) => {
    const { accountId } = req.params;
    AccountSettings.findByIdAndDelete(accountId, (err, account) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      if (account === null) {
        res.status(404).json({ error: `The account with the id ${accountId} could not be found.` });
        return;
      }

      res.status(204).json();
    })
  });
};

module.exports = { accountController };