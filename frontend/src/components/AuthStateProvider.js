import React, { useCallback, useReducer, useContext } from 'react';

const AuthStateContext = React.createContext();

const initialState = {
  authenticated: localStorage.getItem('authenticated') || false,
  user: JSON.parse(localStorage.getItem('user')) || null
}

export const AuthStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('authenticated', true);
        localStorage.setItem('user', JSON.stringify(action.user));
        return { ...state, authenticated: true, user: action.user };
      case 'LOGOUT':
        localStorage.clear();
        return { ...initialState };
      default:
        return state;
    }
  }, initialState);

  const value = {
    ...state,
    dispatch: useCallback(dispatch, [dispatch])
  };

  return <AuthStateContext.Provider value={value} children={children} />;
};

export const useAuthState = () => useContext(AuthStateContext);
