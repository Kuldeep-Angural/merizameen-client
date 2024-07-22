import React from 'react'

import {Button as MUIBUTTON} from '@mui/material'

const Button = (props) => {
  return (
   <MUIBUTTON onClick={onClick}  {...props}>
    {props.children}
   </MUIBUTTON>
  )
}

export default Button