const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answers: {type: [String], required: true},
  correctAnswer: {type: Number, required: true}
});

const Question = mongoose.model("Question", questionSchema);

const quizSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'The google id is required for a quiz.']
  },
  name: {
    type: String,
    required: [true, 'The name is required for a quiz.']
  },
  questions: {
    type: [questionSchema],
    required: [true, 'The list of questions is required for a quiz.']
  }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { questionSchema, Question, quizSchema, Quiz };