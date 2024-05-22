import { createTheme } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#45a148',
      light: '#82C984',
      dark: '#f5bc00',
    },
    secondary: {
      main: '#ffe180',
    },
    success: {
      main: green[200],
    },
    error: {
      main: red[700],
    },
    warning: {
      main: orange[300],
    },
    info: {
      main: blue[100],
    },
    text: {
      main: '#000000',
    },
    input: {
      main: '#514FC9',
    },
  },
});
