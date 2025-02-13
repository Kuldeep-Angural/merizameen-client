import { createTheme } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Change to your chosen primary color
    },
    secondary: {
      main: '#FFC107', // Change to your chosen secondary color
    },
    background: {
      default: '#F5F5F5', // Change to your chosen background color
    },
    text: {
      primary: '#212121', // Change to your chosen text color
    },
    secondary: {
      main: '#FFC107',
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
      main: blue[300],
    },
    text: {
      main: '#000000',
    },
    input: {
      main: '#514FC9',
    },
  },
});
