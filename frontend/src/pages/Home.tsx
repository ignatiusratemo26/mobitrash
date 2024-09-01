import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Button, Flex } from '@chakra-ui/react';
import AnalyticsCard from '../components/AnalyticsCard';
import PickupTable from '../components/PickupTable';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';




function Home() {
  const { currentUser } = useAuth();
  
  const navigate = useNavigate();


  const handleNewRequest = () => {
    navigate('/pickup_requests');
    };

    if (!currentUser) {
      // Show a loading state or redirect to login if the user is not authenticated
      return <div>Loading...</div>;
    }
    
  return (
    <Box p={4}>
      <Grid templateColumns="1fr" gap={6} justifyItems="center">
        <GridItem width="80%" height="50vh">

          <Flex justifyContent="flex-end" mb={4} pr={4}>
              <Button colorScheme='blue' variant='outline' size="sm" onClick={handleNewRequest}>
                new request
              </Button>
            </Flex>

          <PickupTable />
        </GridItem>
        <GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} width="80%">
            <AnalyticsCard title="Analytics 1" content="123" />
            <AnalyticsCard title="Analytics 2" content="456" />
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
