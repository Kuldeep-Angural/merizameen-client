import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { APRoutes } from '../constants/routes';
import { theme } from '../theme/theme';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
export const App = () => {
  return (
    <div className="app" style={{ height: '100%', width: '100%' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <APRoutes />
      </ThemeProvider>
    </div>
  );
};
