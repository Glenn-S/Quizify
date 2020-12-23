import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component:Component, condition, redirect, ...rest}) => {
  return (
    <Route {...rest} render={() => condition ? 
      (
        <Component />
      ) : (
        <Redirect to={redirect} />
      )} />
  );
};

export default ProtectedRoute;