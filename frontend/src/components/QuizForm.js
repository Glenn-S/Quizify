import { useState, useEffect } from 'react';
import { useAuthState } from './AuthStateProvider';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import QuestionForm from './QuestionForm';

const QuizForm = () => {
  const { user } = useAuthState();
  const [name, setName] = useState('');
  const [submit, setSubmit] = useState(false);
  const [questions, setQuestions] = useState([]); // question: { question, answers, correctAnswer }
  const history = useHistory();
  
  useEffect(() => {
    if (submit) {
      if (user && user.id) {
        console.log({ name: name, googleId: user.id, questions: [] });

        axios.post(
          `http://localhost:4000/quiz`, 
          { name: name, googleId: user.id, questions: [] },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            // give a bit of loading feedback
            console.log(res);
            // redirect?
            setName('');
            history.push('/quizzes');
          })
          .catch((reason) => {
            console.log(reason);
            // show a failure page
          });
      }
    }

    return () => {
      setSubmit(false);
    };
  }, [user, name, submit, history]);

  const onSubmit = (event) => {
    console.log('here');
    event.preventDefault();
    setSubmit(true);
  }

  return (
    <div className='container mt-5'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h1 className='title'>Create Quiz</h1>
          <hr/>
          <div className=''>
            <label htmlFor="quizNameField">Quiz Title: </label>
            <input 
              type="text" 
              className="form-control" 
              id="quizNameField" 
              aria-describedby="quizName" 
              placeholder="Enter Quiz Title"
              onChange={event => setName(event.target.value)}
              value={name} 
            />
          </div>

          <div>
            {questions.map((question, i) =>
              <QuestionForm key={i} index={i} value={question} />
            )}
          </div>
          <div className='btn btn-primary mt-2' onClick={() => setQuestions((prev) => [...prev, 'new item'])}>Add Question</div>

        </div>
        <button type="submit" onClick={(event) => onSubmit(event)} className="btn btn-outline-primary float-right">Publish</button>
      </form>
    </div>
  );
};

export default QuizForm;