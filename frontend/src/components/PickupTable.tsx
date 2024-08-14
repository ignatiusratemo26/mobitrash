import React, { useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Badge, Button } from '@chakra-ui/react';
import useRequests from '../hooks/useRequests';
import { ViewIcon } from '@chakra-ui/icons';
import useRequestView from '../hooks/useRequestView';
import PickupRequestCard from './PickupRequestCard';

const PickupTable = () => {
  const { requests, error, isLoading } = useRequests();
  const skeletons = [1];
  // const handleView = useRequestView();

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedRequest, setSelectedRequest ] = useState<number | null>(null);

  const handleView = (id: number) => {
    setIsModalOpen(true);
    setSelectedRequest(id);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  }

  return (
    <>
    <TableContainer maxHeight={'40vh'} overflowY={'auto'}>
      <Table variant='striped' colorScheme='blue' size='sm'>
        <TableCaption>A summary of your recent pickup requests</TableCaption>
        <Thead>
          <Tr>
            <Th>Pickup ID</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
            <Th isNumeric>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Td>{request.id}</Td>
              <Td>{request.request_date}</Td>
              <Td><Badge
                variant={request.status === 'Pending' ? 'outline' : 'solid'}
                colorScheme={request.status === 'Completed' ? 'green' : 'yellow'}>
                {request.status}
              </Badge>
              </Td>
              <Td>
              <Button size="xs" rightIcon={<ViewIcon />} colorScheme='teal' variant='outline' onClick={() => handleView(request.id)}>
                View
              </Button>
              </Td>
              <Td isNumeric>{request.amount_due}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th>TOTAL:</Th>
            <Th isNumeric>Total ---here</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
    { selectedRequest && (<PickupRequestCard isOpen={isModalOpen} onClose={ handleCloseModal } requestId={selectedRequest}  /> )

    }
    </>
  );
};

export default PickupTable;
