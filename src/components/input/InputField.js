import { Box, FormControl, Input, InputLabel, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
/**
 * by default it will show no icons
 * if we pass a type = "password" ,then it will show us a visibility toggler. 
 * if we will pass disabled props in this, then it will show a edit toggler.
 * if we will icon as props then it will then it will show the provided icon.      
 * NOTE-----
 * We cannot use disabled props and  icon props at same time 
 * same will go for password props.
 */
export const InputField = ({ onChange, value, placeholder, helpertext, disabled = false, name,showEditIcon, style,fullWidth = true, label, sx, type = 'text', required, icon, ...rest }) => {
  const [isDisable, setIsDisable] = useState(disabled||showEditIcon);
  const [showPassword, setShowPassword] = useState(false);
  const [showHelpertext,setShowHelpertext] = useState()
  const changehandler =(e)=>{
    const {value} = e.target 
    if (['',null,undefined].includes(value)) {
      setShowHelpertext(true)      
    }
    else{
      setShowHelpertext(false)
    }
    onChange(e);
  }
  return (
    <Box>
      <FormControl required={required} fullWidth sx={{mt:1}} variant="standard">
        <InputLabel fullWidth htmlFor="standard-adornment-password">
          {placeholder || label}
        </InputLabel>
        <Input
        name={name}
          disabled={isDisable}
          variant="outlined"
          helpertext={helpertext}
          type={showPassword ? 'text' : type}
          value={value||''}
          onChange={changehandler}
          fullWidth={fullWidth}
          inputProps={
            type === 'number' && {
              style: { '-moz-appearance': 'textfield' },
              'aria-hidden': true,
            }
          }
          endAdornment={type === 'password' ? showPassword ? <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setShowPassword(false)} /> : <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setShowPassword(true)} /> : icon ? icon : (showEditIcon && <EditIcon style={{ cursor: 'pointer' }} onClick={() => setIsDisable(!isDisable)} />)}
          style={{ ...style }}
          sx={{ ...sx }}
          {...rest}
        />
      </FormControl>
      <Typography sx={{color:'red', fontSize:'10px'}} >{showHelpertext && helpertext}</Typography>
    </Box>
  );
};
