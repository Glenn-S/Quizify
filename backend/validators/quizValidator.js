
const questionValidator = (question) => {
  let isValid = true;
  let validationError = {};

  if (question.correctAnswer >= question.answers.length() || question.correctAnswer < 0) {
    isValid = false;
    validationError.correctAnswer = [
      `The correct answer index must be greater than zero and less than ${question.answers.length() - 1}` 
    ];
  }

  return { isValid: isValid, validationError: validationError };
};

module.exports = { questionValidator };