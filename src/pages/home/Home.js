import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper } from './HomeWrapper';
import { Box, Button } from '@mui/material';
import { LocationAndFilter } from './LocationAndFilter';
import { HighLightCards } from './HighLightCards';
import ListedItems from '../items/ListedItem';

export const Home = ({ updatePageTitle }) => {
  const toastRef= useRef()
  const [filterParams, setFilterParams] = useState('3Bhk');
  const [searchParams, setSearchParams] = useState('')
  useEffect(() => {
    updatePageTitle('Merizameen Home');
  }, []);

  // Use of APToaster
  const handleClick = () => {
    toastRef.current.showToaster({
      messageType:'success',
      message:'Work done',
      position:'top right'
    })
  }
  return (
    <Box>
      <HomeWrapper>
        <LocationAndFilter setFilterParams={setFilterParams} filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams} />
        <HighLightCards />
        <ListedItems filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams}/>
      </HomeWrapper>
    </Box>
  );
};
