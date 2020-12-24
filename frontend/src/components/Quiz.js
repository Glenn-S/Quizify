import { useEffect, useState, useRef } from 'react';
import { useAccountState } from './AccountProvider';
import Loader from './Loader';
import axios from 'axios';
import ExportToPDFButton from './ExportToPDF';

const Quiz = ({ quizId }) => {
  const [ quiz, setQuiz ] = useState({ isLoading: true, quizFields: {} });
  const [isCurrent, setIsCurrent] = useState(false);
  const { theme } = useAccountState();
  const domRef = useRef(null);

  const { name, questions } = quiz.quizFields;

  useEffect(() => {
    setIsCurrent(true);

    if (quizId) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/quiz/${quizId}`)
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
          <div ref={domRef}>
            {quiz && (
              <div className={`card-body ${theme}`}>
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
      <ExportToPDFButton 
        filename={`quizify-${quizId}`} 
        domRef={domRef}
        className='btn btn-outline-primary float-right mt-2'
      >
        Export to PDF
      </ExportToPDFButton>
    </div>
  );
};

export default Quiz;

//<div className='btn btn-outline-primary float-right mt-2' onClick={() => {}}>Export to PDF</div>