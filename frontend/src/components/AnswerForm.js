import QuizInputField from './QuizInputField';

/**
 * Controlled Answer Form component 
 */
const AnswerForm = ({ index, value, onUpdate, onDelete }) => {

  return (
    <div className='mb-2 mt-2'>
      <QuizInputField 
        labelText={`Answer ${index + 1}: `} 
        value={value}
        placeholder='Your Answer'
        onChange={onUpdate} 
        onDelete={onDelete} />
    </div>
  );
};

export default AnswerForm;

/*
<div className='form-inline'>
        <label htmlFor="answerField" className='mr-2'>Answer {index + 1}: </label>
        <textarea
          rows={1}
          cols={60}
          className="form-control mr-2" 
          id="answerField" 
          aria-describedby="answer" 
          placeholder="Your Answer"
          onChange={event => onUpdate(event.target.value, index)}
          value={value} 
        />
        <DeleteButton onClick={onDelete} className='float-right' />
      </div>
*/