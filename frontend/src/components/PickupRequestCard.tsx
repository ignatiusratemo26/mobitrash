import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalCloseButton, Stack,  Button , Divider, Text, Heading, ModalFooter } from '@chakra-ui/react';


import React from 'react'
import useRequest from '../hooks/useRequest';

interface PickupRequestCardProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: number;
}

const PickupRequestCard: React.FC<PickupRequestCardProps> = ({ isOpen, onClose, requestId }) => {
  const { request, error, isLoading } = useRequest(requestId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading request details.</Text>;
  }

  if (!request) {
    return <Text>No request found.</Text>;
  }
  const date = new Date(request.request_date).toISOString().slice(0, 10);
  // const time = new Date(request.request_date).toISOString().slice(11, 19);

  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'
    size='sm'
    >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pickup Request Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4} p={2}>
                    <Stack direction='row' spacing={4}>
                      <Stack direction='column' spacing={2} flex='2' pr={2}>
                        <Text fontWeight='bold' fontSize='sm'>Request ID</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold' fontSize='sm' >Date</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold' fontSize='sm' >Status</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold' fontSize='sm' >Amount Due</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold' fontSize='sm' >Payment Status</Text>
                      </Stack>

                      <Divider orientation='vertical' />

                      <Stack direction='column' spacing={2} flex='2'>
                        <Text textAlign={'right'} fontSize='sm'>#{request.id}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'} fontSize='sm'>{date}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'} fontSize='sm'>{request.status}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'} fontSize='sm'>{request.amount_due  == null ? 'n/a' : request.amount_due }</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'} fontSize='sm' >{ request.payment_status}</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                    { request.amount_due !== null && ( <Button colorScheme="green" mr ='4px' size='sm' >Pay Now</Button> )}
                    <Button colorScheme="blue" onClick={onClose} size='sm' >Close</Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default PickupRequestCard