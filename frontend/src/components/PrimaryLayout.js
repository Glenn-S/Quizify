import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuthState } from './AuthStateProvider';
import { useAccountState } from './AccountProvider';
import Home from './Home';
import About from './About';
import PrimaryHeader from './PrimaryHeader';
import PrimaryFooter from './PrimaryFooter';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Account from './Account';
import Quizzes from './Quizzes';
import QuizForm from './QuizForm';
import Quiz from './Quiz';

const PrimaryLayout = () => {
  const { authenticated } = useAuthState();
  const { theme } = useAccountState();
  
  return (
    <div className={`d-flex flex-column min-vh-100 ${theme}`}>
      <PrimaryHeader />
      <main className='flex-fill' role='main'>
        <Switch>
          <Route exact path='/about' component={About} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/quiz/:quizId' render={(props) => <Quiz quizId={props.match.params.quizId} />} />
          <ProtectedRoute exact path='/login' component={Login} condition={!authenticated} redirect='/home' />
          <ProtectedRoute exact path='/account' component={Account} condition={authenticated} redirect='/login' />
          <ProtectedRoute exact path='/logout' component={Login} condition={authenticated} redirect='/login' />
          <ProtectedRoute exact path='/quizzes' component={Quizzes} condition={authenticated} redirect='/login' />
          <ProtectedRoute exact path='/create-quiz' component={QuizForm} condition={authenticated} redirect='/login' />
          <Redirect to='home' from='/' />
        </Switch>
      </main>
      <PrimaryFooter />
    </div>
  );
};
 
export default PrimaryLayout;