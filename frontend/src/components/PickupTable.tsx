import React from 'react'
import { Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import apiClient from '../services/api-client'
import { CanceledError } from "axios"
import useRequests from '../hooks/useRequests'


const PickupTable = () => {
     const { requests, error } = useRequests();

    return (

    <TableContainer>
        <Table variant='striped' colorScheme='teal' size='sm'>
            <TableCaption>A summary of your recent pickup requests</TableCaption>
            <Thead>
                
            {/* {requests.map((request)=>{
                key={request.id}

})} */}
            <Tr>                
                    <Th >Pickup ID</Th>
                    <Th>Date</Th>
                    <Th>Actions</Th>
                    <Th isNumeric>Cost</Th>
                
            </Tr>

            </Thead>
            <Tbody>
            <Tr>
                <Td>123#</Td>
                <Td>DD/MM/YYYY TIME:TIME</Td>
                <Td>Delete      view</Td>
                <Td isNumeric>25.4</Td>
            </Tr>
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

  )
}

export default PickupTable
