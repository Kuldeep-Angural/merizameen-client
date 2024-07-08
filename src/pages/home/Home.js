import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListedItems from '../items/ListedItem';
import { HighLightCards } from './HighLightCards';
import { LocationAndFilter } from './LocationAndFilter';
import { Wrapper } from './Wrapper';

export const Home = ({ updatePageTitle }) => {
  const [filterParams, setFilterParams] = useState('3Bhk');
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    updatePageTitle('Merizameen Home');
  }, []);

  return (
    <Box>
      <Wrapper>
        <LocationAndFilter setFilterParams={setFilterParams} filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams} />
        <HighLightCards />
        <ListedItems filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams} />
      </Wrapper>
    </Box>
  );
};
