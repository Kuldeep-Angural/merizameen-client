import React, { useEffect, useState } from 'react';
import { HomeWrapper } from './HomeWrapper';
import { Box } from '@mui/material';
import { LocationAndFilter } from './LocationAndFilter';
import { HighLightCards } from './HighLightCards';
import ListedItems from '../items/ListedItem';

export const Home = ({ updatePageTitle }) => {
  const [filterParams, setFilterParams] = useState('3Bhk');
  useEffect(() => {
    updatePageTitle('Merizameen Home');
  }, []);

  return (
    <Box>
      <HomeWrapper>
        <LocationAndFilter setFilterParams={setFilterParams} filterParams={filterParams} />
        <HighLightCards />
        <ListedItems filterParams={filterParams} />
      </HomeWrapper>
    </Box>
  );
};
