import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRef } from 'react';
import 'react-chatbot-kit/build/main.css';
import { useDispatch } from 'react-redux';
import APToaster from '../components/Toaster/APToaster';
import { APRoutes } from '../constants/routes';
import { theme } from '../theme/theme';
if (process.env.REACT_APP_IS_PRODCTION_ENV) {
  console.log = () => { };
  console.warn = () => { };
  console.error = () => { };
}
export const App = () => {
  const dispatch = useDispatch();
  const toastRef = useRef();



  return (
    <div className="app" style={{ height: '100%', width: '100%' }}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>.
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <APToaster ref={toastRef} />
          <APRoutes toastref={toastRef} />
        </ThemeProvider>
      </GoogleOAuthProvider>;
    </div>
  );
};
