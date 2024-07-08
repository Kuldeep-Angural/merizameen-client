import { Grid } from '@mui/material';
import { Footer } from '../../components/footer/Footer';
import { APNavBar } from '../../components/navbar/APNavBar';

export const Wrapper = (props) => {
  return (
    <>
      <Grid sx={{ backgroundColor: 'rgba(169, 184, 183,)' }}>
        <APNavBar />
        {props.children}
        <Footer />
        {/* <Akira /> */}
      </Grid>
    </>
  );
};
