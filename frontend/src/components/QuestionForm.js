import QuizInputField from './QuizInputField';

const QuestionForm = ({ index, questionSet, onUpdate, onDelete }) => {

  const onQuestionUpdate = (value) => {
    onUpdate(index, (prev) => ({...prev, question: value}));
  }

  const addAnswer = () => {
    onUpdate(index, (prev) => ({...prev, answers: [...prev.answers, ''] }));
  }

  const updateCorrectAnswer = (value) => {
    onUpdate(index, (prev) => ({...prev, correctAnswer: value}));
  }

  const onAnswerUpdate = (value, i) => {
    const answers = questionSet.answers;
    answers[i] = value;
    onUpdate(index, (prev) => ({...prev, answers: [...answers] }));
  };

  const onAnswerDelete = (i) => {
    onUpdate(index, (prev) => ({...prev, answers: prev.answers.filter((_, answerIndex) => answerIndex !== i)}));
  }

  return (
    <div className=''>
      <hr/>
      <div className='mb-2'>
        <QuizInputField 
          labelText={`Question ${index + 1}: `} 
          value={questionSet.question}
          placeholder='Your Question'
          onChange={(event) => onQuestionUpdate(event.target.value)} 
          onDelete={() => onDelete(index)} 
        />

        <div className='container card mt-2'>
          <div className='mb-2'>
            {questionSet.answers.map((answer, index) =>
              <div key={index} className='mb-2 mt-2'>
                <QuizInputField 
                  labelText={`Answer ${index + 1}: `} 
                  value={answer}
                  placeholder='Your Answer'
                  onChange={(event) => onAnswerUpdate(event.target.value, index)} 
                  onDelete={() => onAnswerDelete(index)} 
                />
              </div>
            )}
          </div>

          <div className='mb-2 d-flex'>
            <label htmlFor='answerField'>Correct Answer: </label>
            <div className='ml-2 select-container'>
              <select value={questionSet.correctAnswer} onChange={(event) => updateCorrectAnswer(Number.parseInt(event.target.value))}>
                {questionSet.answers.map((_, i) =>
                  <option key={i} value={i}>Answer {i+1}</option>
                )}
              </select>
            </div>
          </div>
          
          <div className='btn btn-primary mt-2 mb-2' onClick={addAnswer}>Add Answer</div>
        </div>


      </div>
    </div>
  );
};

export default QuestionForm;