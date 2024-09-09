import { Text, Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import PickupTable from '../components/PickupTable'

const PickupRequests = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex direction='column'>
      <Flex align='center' justify='space-between' p='22px'>
        <Text fontSize={isMobile ? 'md': 'lg'} fontWeight='bold'>
          Pickup Requests
        </Text>
      </Flex>
      <PickupTable />
    </Flex>
  )
}

export default PickupRequests
