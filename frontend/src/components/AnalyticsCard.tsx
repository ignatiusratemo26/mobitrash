import React from 'react';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react';

interface AnalyticsCardProps {
  title: string;
  content: React.ReactNode;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, content }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardColor = useColorModeValue('black', 'white');

  return (
    <StatGroup
      bg={cardBg}
      borderRadius="md"
      padding="4"
      boxShadow="md"
      color={cardColor}
    >
      <Stat>
        <StatLabel>Total requests</StatLabel>
        <StatNumber>670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel fontSize={{ base: 'sm', md: 'md' }}>Money saved</StatLabel>
        <StatNumber fontSize={{ base: 'sm', md: 'md' }}>Ksh. 45.30</StatNumber>
        <StatHelpText fontSize={{ base: 'sm', md: 'md' }}>
          <StatArrow type='increase' />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default AnalyticsCard;
