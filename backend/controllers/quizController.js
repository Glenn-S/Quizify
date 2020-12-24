const mongoose = require('mongoose');
const { Quiz } = require('../models/Quiz');  

// TODO add in the question validator.

/**
 * @param {import('express').Express} app 
 */
const quizController = (app) => {
  /*************************** Quizzes ****************************/

  /**
   * Get all quizzes.
   */
  app.get('/quiz', (req, res) => {
    // get all quizes
    Quiz.find((err, quizzes) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      
      res.status(200).json({ quizzes: quizzes });
    });
  });

  /**
   * Get quiz by id. Optionally get quiz by googleId using the query param '?isGoogleId=true'
   */
  app.get('/quiz/:quizId', (req, res) => {
    const { quizId } = req.params;
    const { isGoogleId } = req.query;

    if (isGoogleId) {
      Quiz.find({ googleId: quizId }, (err, quiz) => {
        if (err) {
          res.status(500).json({ error: err });
          return
        }

        if (quiz === null) {
          res.status(404).json({ error: `The quiz with the google id: ${quizId} could not be found` });
          return;
        }

        res.status(200).json({ quizzes: quiz });
      });
    }
    else {
      Quiz.findById(mongoose.Types.ObjectId(quizId), (err, quiz) => {
        if (err) {
          res.status(500).json({ error: err });
          return
        }

        if (quiz === null) {
          res.status(404).json({ error: `The quiz with id: ${quizId} could not be found` });
          return;
        }

        res.status(200).json({ quiz: quiz });
      });
    }
  });

  /**
   * Update a quiz partial.
   */
  app.patch('/quiz/:quizId', (req, res) => {
    const { quizId } = req.params;
    const { questions, name } = req.body;

    Quiz.updateOne({ _id: quizId }, {questions: questions, name: name}, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      Quiz.findById(quizId, (err, updatedQuiz) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }

        if (updatedQuiz === null) {
          res.status(500).json({ error: 'There was an error retrieving the updated quiz'});
          return;
        }

        res.status(206).json({ quiz: updatedQuiz });
      });
    });
  });

  /**
   * Update a quiz.
   */
  app.put('/quiz/:quizId', (req, res) => {
    const { quizId } = req.params;
    const { googleId, questions, name } = req.body;

    // TODO validation on updates doesn't work

    Quiz.updateOne({ _id: quizId }, { googleId: googleId, questions: questions, name: name}, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      Quiz.findById(quizId, (err, updatedQuiz) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }

        if (updatedQuiz === null) {
          res.status(500).json({ error: 'There was an error retrieving the updated quiz'});
          return;
        }

        res.status(200).json({ quiz: updatedQuiz });
      });
    });
  });

  /**
   * Create a new quiz
   */
  app.post('/quiz', (req, res) => {
    const { googleId, questions, name } = req.body;

    console.log(googleId, questions, name);

    const newQuiz = new Quiz({ googleId, questions: questions, name: name });
    newQuiz.save((err, result) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (result === null) {
        res.status(500).json({ error: 'An error occurred while trying to create the quiz.' });
        return;
      }

      res.status(201).json({ quiz: newQuiz });
    });

  });

  /**
   * Delete a quiz by id.
   */
  app.delete('/quiz/:quizId', (req, res) => {
    const { quizId } = req.params;

    Quiz.findByIdAndDelete(quizId, (err, result) => {
      console.log(err, result);
  
      if (err) {
        res.status(500).json({ error: err });
          return;
      }
  
      if (result === null) {
        res.status(404).json({ error: `The quiz with the id: ${quizId} does not exist.` });
        return;
      }
  
      res.status(204).json();
    });
  });

  /************************ Questions *************************/

  /**
   * Get all questions for a quiz.
   */
  app.get('/quiz/:quizId/question', (req, res) => {
    const { quizId } = req.params;

    Quiz.findById(quizId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      const { questions } = result;

      res.status(200).json({ questions: questions });
    });
  });

  /**
   * Get a specific question by id in a quiz
   */
  app.get('/quiz/:quizId/question/:questionId', (req, res) => {
    const { quizId, questionId } = req.params;

    Quiz.findById(quizId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      const question = result.questions.id(questionId);
      if (question === null) {
        res.status(404).json({ error: `The question with the id: ${questionId} could not be found.`});
        return;
      }

      res.status(200).json({ question });
    });
  });

  /**
   * Create a new question for a quiz. Optionally specify its location using the query param '?index={int}'
   * Index must be between 0 and 1-length of the questions array.
   */
  app.post('/quiz/:quizId/question', (req, res) => {
    const { quizId } = req.params;
    const { question } = req.body;
    const { index } = req.query;

    Quiz.findById(quizId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      if (result === null) {
        res.status(404).json({ error: `The quiz with the id ${quizId} could not be found` });
        return;
      }

      if (index !== null) {
        if (typeof(index) !== 'string') {
          res.status(400).json({ error: 'The query parameter "index" must be a number' });
          return;
        }

        if (index >= result.questions.length || index < 0) {
          res.status(400).json({ error: 'The index provided is out of range.' });
          return;
        }

        result.questions.splice(index, 0, question);
      }
      else {
        result.questions.push(question);
      }
      result.save();
      
      res.status(201).json({ question });
    });
  });

  /**
   * Update a quiz questions location in the questions array.
   */
  app.put('/quiz/:quizId/question/:questionId/:index(\\d+)', (req, res) => {
    const { quizId, questionId, index } = req.params;

    Quiz.findById(quizId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      const question = result.questions.id(questionId);
      if (question === null) {
        res.status(404).json({ error: `The question with the id: ${questionId} could not be found.`});
        return;
      }

      if (index !== null && index !== undefined) {
        if (index >= result.questions.length || index < 0) {
          res.status(400).json({ error: 'The index provided is out of range.' });
          return;
        }

        result.questions.splice(index, 0, question);
      }

      res.status(204).json();
    });
  });

  /**
   * Delete a specific question.
   */
  app.delete('/quiz/:quizId/question/:questionId', (req, res) => {
    const { quizId, questionId } = req.params;
    // console.log(questionId);

    Quiz.findById(quizId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      const question = result.questions.id(questionId);
      if (question === null) {
        res.status(404).json({ error: `The question with the id: ${questionId} could not be found.`});
        return;
      }

      result.questions = result.questions.filter(x => x.id !== questionId);
      result.save();

      res.status(200).json({ question });
    });
  });
};

module.exports = { quizController };