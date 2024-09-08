import React, { useState } from 'react';
import { Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
   TableContainer, Badge, Button, useBreakpointValue, 
   useColorMode,  useColorModeValue,
   Card, Flex, Box, 
   Icon} from '@chakra-ui/react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';


const PaymentsTable = () => {
    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");
    const payments = [
        {
            id: 1,
            date: '2021-10-01',
            amount: 200,
            status: 'pending'
        },
        {
            id: 2,
            date: '2021-10-02',
            amount: 200,
            status: 'paid'
        },
        {
            id: 3,
            date: '2021-10-03',
            amount: 200,
            status: 'pending'
        },
        {
            id: 4,
            date: '2021-10-04',
            amount: 200,
            status: 'paid'
        },
    ]
  return (
    <Card p='0px' maxW={{ sm: "320px", md: "100%" }} maxHeight={'80vh'} overflowY={'auto'}>
        <Flex direction='column'>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table
                variant='simple'
                size='sm'
                colorScheme='blackAlpha'
                borderWidth='1px'
                borderColor={borderColor}
                borderRadius='md'
            >
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color='gray.400' borderColor={borderColor}>
                    Payment ID
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Date
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Amount
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {payments.map((payment: any) => (
                  <Tr key={payment.id} >
                    <Td color={textTableColor} borderColor={borderColor}>
                      {payment.id}
                    </Td>
                    <Td color={textTableColor} borderColor={borderColor}>
                      {payment.date}
                    </Td>
                    <Td color={textTableColor} borderColor={borderColor}>
                      Ksh.{payment.amount}
                    </Td>
                    <Td color={textTableColor} borderColor={borderColor}>
                      { payment.status === 'pending' ? (
                        <Flex direction='row'>
                        <Icon as={FaCircle} color='yellow.300' mr={2} mt={1} boxSize={2} /> 
                        <Text>Pending</Text>
                        </Flex>
                        
                      ) : (
                        <Flex direction='row'>
                        <Icon as={FaCircle} color='green.500' mr={2} mt={1} boxSize={2} />
                        <Text>Paid</Text>
                        </Flex>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>

  )
}

export default PaymentsTable