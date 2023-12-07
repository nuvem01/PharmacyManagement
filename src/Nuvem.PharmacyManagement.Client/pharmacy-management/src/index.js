import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import pharmacyApi from './service/pharmacyService';
import { DependencyInjectionProvider } from './context/dependencyInjectionContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const dependencies = {
  pharmacyApi,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
         <DependencyInjectionProvider dependencies={dependencies}>
            <App />
         </DependencyInjectionProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
