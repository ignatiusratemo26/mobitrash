import React, { useState } from 'react';
import { Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
   TableContainer, Badge, Button, useBreakpointValue, 
   useColorMode,  useColorModeValue,
   Card, Flex, Box } from '@chakra-ui/react';

import useRequests from '../hooks/useRequests';
import { CloseIcon, ViewIcon } from '@chakra-ui/icons';
import useRequestView from '../hooks/useRequestView';
import PickupRequestCard from './PickupRequestCard';
import useDeleteRequest from '../hooks/useDeleteRequest';


const PickupTable = () => {
  const { requests, error, isLoading } = useRequests();
  const deleteRequest = useDeleteRequest();
  const skeletons = [1];
  const isMobileOrTablet = useBreakpointValue({ base: true, md: false });
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedRequest, setSelectedRequest ] = useState<number | null>(null);

  const { colorMode } = useColorMode();

  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const handleView = (id: number) => {
    setIsModalOpen(true);
    setSelectedRequest(id);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  }
  const handleDeleteRequest = (id: number) => {
    deleteRequest(id)
  }
  
  

  return (
    <>

      <Card p='0px' maxW={{ sm: "320px", md: "100%" }} maxHeight={'40vh'} overflowY={'auto'}>
          <Flex direction='column'>
            <Flex align='center' justify='space-between' p='22px'>
              <Text fontSize='lg' fontWeight='bold'>
                Pickup Requests
              </Text>
              <Button colorScheme='blue' maxH='20px'>
                SEE ALL
              </Button>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color='gray.400' borderColor={borderColor}>
                      Request ID
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Date
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Actions
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Status
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {requests.map((request, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          fontWeight='bold'
                          borderColor={borderColor}>
                          {request.id}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          borderColor={borderColor}>
                          {new Date(request.request_date).toISOString().slice(0, 10) +'  '+ 
                          new Date(request.request_date).toISOString().slice(11, 16) }
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          borderColor={borderColor}>
                          

                          <Button size="xs" rightIcon={<ViewIcon />} colorScheme='teal' variant='outline' mr={2} onClick={() => handleView(request.id)}>
                            View
                          </Button>
                          { request.status === 'Pending' && 
                          ( <Button size="xs" rightIcon={<CloseIcon />} colorScheme='red' variant='outline' onClick={() => handleDeleteRequest(request.id)}>
                            Cancel </Button> )}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          borderColor={borderColor}
                          display={{ base: 'none', md: 'table-cell' }}>
                          <Badge
                          variant={request.status === 'Pending' ? 'outline' : 'solid'}
                          colorScheme={request.status === 'Completed' ? 'green' : 'yellow'}>
                          {request.status}
                        </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>


    {/* <TableContainer maxHeight={'40vh'} overflowY={'auto'}>
      <Table variant='striped' colorScheme='blue' size='sm'>
        <TableCaption>A summary of your recent pickup requests</TableCaption>
        <Thead>
          <Tr>
            <Th>Pickup ID</Th>
            <Th display={{ base: 'none', md: 'table-cell' }}>Date</Th>
            <Th display={{ base: 'none', md: 'table-cell' }}>Status</Th>
            <Th>Actions</Th>
            <Th display={{ base: 'none', md: 'table-cell' }} isNumeric>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Td>#{request.id}</Td>
              <Td display={{ base: 'none', md: 'table-cell' }}>
                {new Date(request.request_date).toISOString().slice(0, 10) +' '+ 
                new Date(request.request_date).toISOString().slice(11, 19) }</Td>

              <Td display={{ base: 'none', md: 'table-cell' }}><Badge
                variant={request.status === 'Pending' ? 'outline' : 'solid'}
                colorScheme={request.status === 'Completed' ? 'green' : 'yellow'}>
                {request.status}
              </Badge>
              </Td>
              <Td>
                <Button size="xs" rightIcon={<ViewIcon />} colorScheme='teal' variant='outline' mr={2} onClick={() => handleView(request.id)}>
                  View
                </Button>
                { request.status === 'Pending' && 
                ( <Button size="xs" rightIcon={<CloseIcon />} colorScheme='red' variant='outline' onClick={() => handleDeleteRequest(request.id)}>
                  Cancel </Button> )}
              </Td>
              <Td display={{ base: 'none', md: 'table-cell' }} isNumeric>{request.amount_due}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer> */}



    { selectedRequest && (<PickupRequestCard isOpen={isModalOpen} onClose={ handleCloseModal } requestId={selectedRequest}  /> )

    }
    </>
  );
};

export default PickupTable;
