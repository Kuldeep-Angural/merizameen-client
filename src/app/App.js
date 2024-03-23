import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { APRoutes } from '../constants/routes';
import Auth from '../pages/authantication/Auth';
import { theme } from '../theme/theme';
import { Home } from '../pages/home/Home';
export const App = () => {

  
  return (
    <div className="app" style={{ height: '100%', width: '100%' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path={APRoutes.base} Component={Home}/>
          <Route path={APRoutes.auth} Component={Auth}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
};
