import { Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PickupTable from '../components/PickupTable'

const PickupRequests = () => {
  return (
    <Flex direction='column'>
      <Flex align='center' justify='space-between' p='22px'>
        <Text fontSize='lg' fontWeight='bold'>
          Pickup Requests
        </Text>
      </Flex>
      <PickupTable />
    </Flex>
  )
}

export default PickupRequests
