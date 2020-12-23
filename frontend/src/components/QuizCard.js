import DeleteIcon from '@material-ui/icons/Delete';

const QuizCard = ({ quiz, onClick, onDelete }) => {
  
  return (
    <div className='list-group-item' data-toggle='tooltip' data-placement='top' title='Tooltip '>
      <div onClick={() => onClick(quiz._id)}>
        <h5>{quiz.name}</h5>
        <p>Id: {quiz._id}</p>
      </div>
      <div onClick={() => onDelete(quiz._id)} className=''>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default QuizCard;