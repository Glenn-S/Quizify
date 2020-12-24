import DeleteButton from './DeleteButton';

const QuizCard = ({ quiz, onClick, onDelete }) => {
  
  return (
    <div className='list-group-item quizCard' data-toggle='tooltip' data-placement='top' title='Tooltip '>
      <div className='d-inline-flex' onClick={() => onClick(quiz._id)}>
        <h5 className='mr-2 align-self-baseline'>{quiz.name}</h5>
        <DeleteButton className='mr-2 align-self-baseline' onClick={() => onDelete(quiz._id)} />
      </div>
    </div>
  );
};

export default QuizCard;