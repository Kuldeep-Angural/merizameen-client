import { Children } from 'react';
import { APNavBar } from '../../components/navbar/APNavBar';
import { Footer } from '../../components/footer/Footer';
import { LocationAndFilter } from './LocationAndFilter';

export const HomeWrapper = (props) => {
  return (
    <>
      <APNavBar />
      <LocationAndFilter/>
      {props.children}
      <Footer />
    </>
  );
};
