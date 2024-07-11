import { Typography } from '@mui/material'
import React from 'react'

const Titleheader = ({title , fontSize=18 , fontWeight=600 , ...rest}) => {
  return (
    <Typography fontSize={fontSize} fontWeight={fontWeight}  {...rest}>{title}</Typography>
  )
}

export default Titleheader
