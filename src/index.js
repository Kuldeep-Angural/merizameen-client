import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { apStore } from './configuration/apStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}  >
      <CssBaseline />
      <BrowserRouter>
      <Provider store={apStore}>
        <App />
      </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
