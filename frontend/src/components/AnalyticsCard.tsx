import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface AnalyticsCardProps {
  title: string;
  content: React.ReactNode;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, content }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardColor = useColorModeValue('black', 'white');

  return (
    <Box p={4} bg={cardBg} color={cardColor} rounded="md" shadow="md">
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="2xl">{content}</Text>
    </Box>
  );
};

export default AnalyticsCard;
