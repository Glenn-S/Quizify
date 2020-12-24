import { useEffect, useState } from 'react';
import { useAuthState } from './AuthStateProvider';
import Loader from './Loader';
import QuizCard from './QuizCard';
import axios from 'axios';
import { useHistory } from 'react-router';

const Quizzes = () => {
  const history = useHistory();
  const { user } = useAuthState();
  const [ quizList, setQuizList ] = useState({ isLoading: true, quizzes: [] });
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    setIsCurrent(true);

    if (user && user.googleId) {
      axios.get(`http://localhost:4000/quiz/${user.googleId}?isGoogleId=true`)
        .then((res) => {
          // give a bit of loading feedback
          if (isCurrent) {
            setTimeout(() => {
              setQuizList({ isLoading: false, quizzes: res.data.quizzes });
            }, 100);
          }
        })
        .catch((reason) => {
          console.log(reason);
          // show a failure page
        });
    }
    
    return () => (setIsCurrent(false));
  }, [user, isCurrent]);

  const onClickDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/quiz/${id}`)
      .then((result) => {
        console.log(result.status);
        setIsCurrent(false);
      })
      .catch((reason) => {
        console.log(reason);
        // show a failure page
      });
  }

  const onClick = (id) => history.push(`/quiz/${id}`);

  return (
    <div className='container mt-5'>
      <h2>Quizzes Owned</h2>
      {quizList.isLoading ? (
        <Loader />
      ) : (
        <div className='list-group'>
          {quizList.quizzes && quizList.quizzes.map(x => 
            <QuizCard 
              key={x._id} 
              quiz={x}
              onClick={onClick}
              onDelete={onClickDelete} 
            />)}
        </div>
      )}
      <br/>
      <div className='btn btn-primary' onClick={() => history.push('/create-quiz')}>Create Quiz</div>
    </div>
  );
};

export default Quizzes;