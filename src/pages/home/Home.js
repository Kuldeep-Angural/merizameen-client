import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListedItems from '../items/ListedItem';
import { HighLightCards } from './HighLightCards';
import { LocationAndFilter } from './LocationAndFilter';
import { Wrapper } from './Wrapper';

export const Home = ({ updatePageTitle }) => {
  const [filterParams, setFilterParams] = useState('');
  const [searchParams, setSearchParams] = useState('');
  const [location, setLocation] = useState({});


  useEffect(() => {
    updatePageTitle('Merizameen Home');
  }, []);

  return (
    <Box>
      <Wrapper>
        {/* <LocationAndFilter setFilterParams={setFilterParams} filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams} setLocation={setLocation} location={location}/> */}
        <HighLightCards setFilterParams={setFilterParams} filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams} setLocation={setLocation} location={location} />
        <ListedItems filterParams={filterParams} searchParams={searchParams} setSearchParams={setSearchParams}  setLocation={setLocation} location={location}/>
      </Wrapper>
    </Box>
  );
};
