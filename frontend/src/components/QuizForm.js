import { useState, useEffect } from 'react';
import { useAuthState } from './AuthStateProvider';
import { useAccountState } from './AccountProvider';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import InputField from './InputField';

const QuizForm = () => {
  const { user } = useAuthState();
  const { theme } = useAccountState();
  // const [isError, setIsError] = useState({ isError: false, error: {} });
  const [quizName, setQuizName] = useState('');
  const [submit, setSubmit] = useState(false);
  const [questions, setQuestions] = useState([]); // question: { question, answers, correctAnswer }
  const history = useHistory();

  useEffect(() => {
    if (submit) {
      if (user && user.googleId) {

        axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/quiz`, 
          { name: quizName, googleId: user.googleId, questions: questions },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            setQuizName('');
            history.push('/quizzes');
          })
          .catch((reason) => {
            console.log(reason);
            // setIsError({ isError: true, error: reason });
            // show a failure page
          });
      }
    }

    return () => {
      setSubmit(false);
    };
  }, [user, quizName, submit, history, questions]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(questions);
    // TODO validate the data?
    setSubmit(true);
  }

  const onDelete = (index) => setQuestions((prev) => prev.filter((_, i) => i !== index));

  const onUpdate = (index, fn) => setQuestions((prev) => prev.map((x, i) => i === index ? fn(prev[index]) : x));

  // TODO add form validators (bootstrap) gs

  return (
    <div className='container mt-5'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h1 className='title'>Create Quiz</h1>
          <hr className={`${theme}`} />
          <InputField 
            labelText='Quiz Title: ' 
            placeholder='Enter Quiz Title' 
            value={quizName} 
            onChange={setQuizName} 
          />

          <div className=''>
            {questions.map((question, index) => 
              <QuestionForm 
                key={index} 
                index={index}
                questionSet={question}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            )}
          </div>

          <div 
            className='btn btn-primary mt-2' 
            onClick={() => setQuestions((prev) => [...prev, {question: '', answers: [''], correctAnswer: 0 }])}
          >Add Question</div>
        </div>
        
        <button type="submit" onClick={() => history.push('/quizzes')} className="btn btn-outline-primary float-right">Cancel</button>
        <button type="submit" onClick={(event) => onSubmit(event)} className="btn btn-outline-primary float-right mr-2">Publish</button>
      </form>
    </div>
  );
};

export default QuizForm;