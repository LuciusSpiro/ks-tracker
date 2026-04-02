import React, { createContext, useEffect, useReducer } from 'react';
import { AppData } from '../types';
import { reducer, Action, INITIAL_STATE } from './reducer';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AppContextValue {
  state: AppData;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    return loadFromStorage() ?? INITIAL_STATE;
  });

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.darkMode);
  }, [state.settings.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
