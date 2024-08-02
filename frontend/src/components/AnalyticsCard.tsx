import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const AnalyticsCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <Box p={4} bg="white" shadow="md" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
      <Text fontSize="2xl">{value}</Text>
    </Box>
  );
};

export default AnalyticsCard;
