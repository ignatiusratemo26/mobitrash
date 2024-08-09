import React from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import useRequests from '../hooks/useRequests';

const PickupTable = () => {
  const { requests, error, isLoading } = useRequests();
  const skeletons = [1];

  return (
    <TableContainer maxHeight={'40vh'} overflowY={'auto'}>
      <Table variant='striped' colorScheme='blue' size='sm'>
        <TableCaption>A summary of your recent pickup requests</TableCaption>
        <Thead>
          <Tr>
            <Th>Pickup ID</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
            <Th isNumeric>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Td>{request.id}</Td>
              <Td>{request.request_date}</Td>
              <Td>Delete view</Td>
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
  );
};

export default PickupTable;
