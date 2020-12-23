import DeleteIcon from '@material-ui/icons/Delete';

/**
 * Controlled Answer Form component 
 */
const AnswerForm = ({ index, value, onUpdate, onDelete }) => {

  return (
    <div className='mb-2 mt-2'>
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
        <div onClick={onDelete} className='float-right'>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;