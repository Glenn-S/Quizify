import { useState } from 'react';
import AnswersForm from './AnswerForm';
import DeleteIcon from '@material-ui/icons/Delete';

const QuestionForm = ({ index, value, onQuestionUpdate, onQuestionDelete }) => {
  // TODO Figure out how to make this a controlled component from the quiz form 
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['']); // start with one item
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const onUpdate = (value, index) => {
    setAnswers((prev) => {
      prev[index] = value;
      return [...prev];
    });
  };

  const onDelete = (index) => {
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className=''>
      <div className='ml-5'>
        <hr/>
        <div className='mb-2'>
          <div className='form-inline'>
            <label htmlFor="questionField" className='mr-2'>Question {index + 1}: </label>
            <textarea 
              rows={1}
              cols={60} 
              className="form-control mr-2" 
              id="questionField" 
              aria-describedby="question" 
              placeholder="Your Question"
              onChange={event => setQuestion(event.target.value)}
              value={question} 
            />
            <div onClick={(event) => {}} className=''>
              <DeleteIcon />
            </div>
          </div>

          <div className='btn btn-primary mt-2' onClick={() => setAnswers((prev) => [...prev, ''])}>Add Answer</div>

          <div className='container card mt-2'>
            <div className='mb-2'>
              {answers.map((answer, i) => 
                <AnswersForm 
                  key={i} 
                  value={answer} 
                  index={i} 
                  onUpdate={onUpdate} 
                  onDelete={() => onDelete(i)} 
                />
              )}
            </div>

            <div className='mb-2 d-flex'>
              <label htmlFor='answerField'>Correct Answer: </label>
              <div className='ml-2 select-container'>
                <select value={correctAnswer} onChange={(event) => setCorrectAnswer(event.target.value)}>
                  {answers.map((_, i) =>
                    <option key={i} value={i}>Answer {i+1}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;