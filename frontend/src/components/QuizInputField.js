import DeleteButton from './DeleteButton';

const QuizInputField = ({ labelText, placeholder, value, onChange, onDelete, className, ...rest }) => {
  return (
    <div className={`${className} form-inline`}>
      <label htmlFor="field" className='mr-2'>{labelText}</label>
      <textarea 
        rows={1}
        cols={60} 
        className="form-control mr-2" 
        id="quizField" 
        aria-describedby="input" 
        placeholder={placeholder}
        onChange={(event) => onChange(event)}
        value={value} 
      />
      <DeleteButton onClick={(event) => onDelete(event)} />
    </div>
  );
};

export default QuizInputField;