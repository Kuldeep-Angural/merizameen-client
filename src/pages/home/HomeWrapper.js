import { Grid } from '@mui/material';
import { Footer } from '../../components/footer/Footer';
import { APNavBar } from '../../components/navbar/APNavBar';
import Akira from '../../components/chatBot/Akira';

export const HomeWrapper = (props) => {
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
