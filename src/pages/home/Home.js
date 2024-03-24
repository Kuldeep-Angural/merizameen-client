import React from 'react';
import { HomeWrapper } from './HomeWrapper';
import { Box } from '@mui/material';
import { LocationAndFilter } from './LocationAndFilter';
import { HighLightCards } from './HighLightCards';
import ListedItems from '../items/ListedItem';

export const Home = () => {
  return (
    <Box>
      <HomeWrapper>
        <LocationAndFilter />
        <HighLightCards />
        <ListedItems />
      </HomeWrapper>
    </Box>
  );
};
