import Link from 'next/link';
import { Typography, Button, Container, Box } from '@mui/material';

const Page = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h2" align="center" gutterBottom>
          Hi there!
        </Typography>
        <Box display="flex" justifyContent="center">
          <Link href="/events" passHref>
            <Button variant="contained" color="primary">
              Go to List
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
