import { Text } from '@chakra-ui/react'
import React from 'react'
import PickupTable from '../components/PickupTable'

const PickupRequests = () => {
  return (
    <>
      <Text size={'lg'}>Pickup Requests</Text>
      <PickupTable />
    </>
  )
}

export default PickupRequests
