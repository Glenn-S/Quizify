import { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Quiz = ({ quizId }) => {
  const [ quiz, setQuiz ] = useState({ isLoading: true, quizFields: {} });
  const [isCurrent, setIsCurrent] = useState(false);

  const { name, questions } = quiz.quizFields;

  useEffect(() => {
    setIsCurrent(true);

    if (quizId) {
      axios.get(`http://localhost:4000/quiz/${quizId}`)
        .then((res) => {
          // give a bit of loading feedback
          if (isCurrent) {
            setTimeout(() => {
              setQuiz({ isLoading: false, quizFields: res.data.quiz });
            }, 200);
          }
        })
        .catch((reason) => {
          console.log(reason);
          // show a failure page
        });
    }
    
    return () => (setIsCurrent(false));
  }, [quizId, isCurrent]);

  return (
    <div className='container mt-5'>
      <div className='card'>
        {quiz.isLoading ? (
          <Loader />
        ) : (
          <div className='list-group'>
            {quiz && (
              <div>
                <h1 className='ml-3 mt-3'>Name: {name}</h1>
                <hr/>
                {questions.map((question, i) => 
                  <div key={i} className='container mb-2'>
                    <div>Question {i+1}: {question.question}</div>
                    <div>
                      {question.answers.map((answer, index) => 
                        <div className='ml-3' key={index}>{index+1}) {answer}</div>  
                      )}
                    </div>
                    <hr/>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;