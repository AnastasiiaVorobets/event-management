import Link from 'next/link';
import { Typography, Button, Container, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" paragraph>
          Discover exciting events near you and connect with a community of enthusiasts.
        </Typography>
        <Box mt={3}>
          <Link href="/events" passHref>
            <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
              Explore Events
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
