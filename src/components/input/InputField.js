import { Box, Input, InputLabel, TextField } from '@mui/material';
import React from 'react';

export const InputField = ({ onChange, value, placeholder, name, style, label, sx, type = 'text', required = false, ...rest }) => {
  return (
    <Box>
      <InputLabel htmlFor="standard-adornment-password">{placeholder || label}</InputLabel>
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
        inputProps={
          type === 'number' && {
            style: { '-moz-appearance': 'textfield' },
            'aria-hidden': true,
          }
        }
        // endAdornment={}

        style={{ ...style }}
        sx={{ ...sx }}
        required={required}
        {...rest}
      />
    </Box>
  );
};
