import { createContext, useContext } from 'react';

const DependencyInjectionContext = createContext();

export const useDependencyInjection = () => {
  const context = useContext(DependencyInjectionContext);

  if (!context) {
    throw new Error('useDependencyInjection must be used within a DependencyInjectionProvider');
  }

  return context;
};

export const DependencyInjectionProvider = ({ children, dependencies }) => {
  return (
    <DependencyInjectionContext.Provider value={dependencies}>
      {children}
    </DependencyInjectionContext.Provider>
  );
};
