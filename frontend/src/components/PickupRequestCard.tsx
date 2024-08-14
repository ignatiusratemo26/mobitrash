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
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pickup Request Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4} p={4}>
                    <Stack direction='row' spacing={4}>
                      <Stack direction='column' spacing={2} flex='5' pr={2}>
                        <Text fontWeight='bold'>Request ID</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold'>Date</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold'>Status</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold'>Amount Due</Text>
                        <Divider orientation='horizontal' />
                        <Text fontWeight='bold'>Payment Status</Text>
                      </Stack>

                      <Divider orientation='vertical' />

                      <Stack direction='column' spacing={2} flex='2'>
                        <Text textAlign={'right'}>#{request.id}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'}>{date}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'}>{request.status}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'}>{request.amount_due}</Text>
                        <Divider orientation='horizontal' />
                        <Text textAlign={'right'}>{request.payment_status}</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default PickupRequestCard