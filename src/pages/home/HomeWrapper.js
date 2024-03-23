import { Footer } from '../../components/footer/Footer';
import { APNavBar } from '../../components/navbar/APNavBar';
import { LocationAndFilter } from './LocationAndFilter';

export const HomeWrapper = (props) => {
  return (
    <>
      <APNavBar />
      <LocationAndFilter />
      {props.children}
      <Footer />
    </>
  );
};
