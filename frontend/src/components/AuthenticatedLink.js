import { Link } from 'react-router-dom';

const AuthenticatedLink = ({children, condition, ...rest}) => {
  return (
    <div>
    {condition && (
      <Link {...rest}>
        {children}
      </Link>
    )}
    </div>
  );
};

export default AuthenticatedLink;