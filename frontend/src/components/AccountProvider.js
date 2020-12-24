import React, { useContext, useReducer, useCallback } from 'react';

const AccountProviderContext = React.createContext();

const initialState = {
  theme: localStorage.getItem('theme') || 'light'
};

export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LIGHT_MODE':
        localStorage.setItem('theme', 'light');
        return { ...state, theme: 'light' };
      case 'DARK_MODE':
        localStorage.setItem('theme', 'dark');
        return { ...state, theme: 'dark' };
      default:
        return state;
    }
  },
  initialState);

  const value = {
    ...state,
    dispatch: useCallback(dispatch, [dispatch])
  };

  return <AccountProviderContext.Provider value={value} children={children} />;
};

export const useAccountState = () => useContext(AccountProviderContext);