import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalCloseButton, Stack,  Button ,StackDivider, Text, Heading, ModalFooter } from '@chakra-ui/react';


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

  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pickup Request Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>ID: {request.id}</Text>
                    <Text>Email: {request.user_email}</Text>
                    <Text>Date: {request.request_date}</Text>
                    <Text>Amount Due: {request.amount_due}</Text>
                    <Text>Status: {request.status}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default PickupRequestCard