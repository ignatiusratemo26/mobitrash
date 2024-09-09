import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Button, Flex } from '@chakra-ui/react';
import AnalyticsCard from '../components/AnalyticsCard';
import RecentPickupTable from '../components/RecentPickupTable';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useSubmitRequest from '../hooks/useSubmitRequest';




function Home() {
  const { currentUser } = useAuth();
  const {submitRequest} = useSubmitRequest();
  const navigate = useNavigate();


  const handleNewRequest = () => {
    submitRequest();

    };

    if (!currentUser) {
      // Show a loading state or redirect to login if the user is not authenticated
      return <div>Loading...</div>;
    }
    
  return (
    <Box p={4}>
      <Grid templateColumns="1fr" gap={6} justifyItems="center">
        <GridItem width="90%" height="50vh">

          <Flex justifyContent="flex-end" mb={4} pr={4}>
              <Button colorScheme='blue' variant='outline' size="sm" onClick={handleNewRequest}>
                new request
              </Button>
            </Flex>

          <RecentPickupTable />
        </GridItem>

        <GridItem width="100%">
          <Grid 
          templateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(200px, 1fr))' }} 
          gap={4} 
          width="100%"
          templateRows={{ base: 'repeat(2, 1fr)', md: 'auto' }}
          >
            <GridItem>
              <AnalyticsCard title="Analytics 1" content="123" />
            </GridItem>
            <GridItem>
              <AnalyticsCard title="Analytics 2" content="456" />
            </GridItem>
          </Grid>
        </GridItem>

      </Grid>
    </Box>
  );
};

export default Home;
