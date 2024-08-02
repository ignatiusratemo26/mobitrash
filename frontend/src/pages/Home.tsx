import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import AnalyticsCard from '../components/AnalyticsCard';
import PickupTable from '../components/PickupTable';

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Grid templateColumns="1fr" gap={6} justifyItems="center">
        <GridItem width="80%">
          <PickupTable />
        </GridItem>
        <GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} width="80%">
            <AnalyticsCard title="Analytics 1" value="123" />
            <AnalyticsCard title="Analytics 2" value="456" />
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
