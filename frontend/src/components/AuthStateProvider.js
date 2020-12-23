import React, { useCallback, useReducer, useContext } from 'react';

const AuthStateContext = React.createContext();

const initialState = {
  authenticated: false,
  user: null
}

export const AuthStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, authenticated: true, user: action.user };
      case 'LOGOUT':
        return { ...initialState };
      default:
        return state;
    }
  });

  const value = {
    ...state,
    dispatch: useCallback(dispatch, [dispatch])
  };

  return <AuthStateContext.Provider value={value} children={children} />;
};

export const useAuthState = () => useContext(AuthStateContext);
