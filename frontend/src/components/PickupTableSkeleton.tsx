import { Skeleton, SkeletonText, Table, TableContainer } from '@chakra-ui/react'


const PickupTableSkeleton = () => {
  return (
    <TableContainer>
        <Skeleton height='200px'/>
        <Table>
            <SkeletonText />
        </Table>

    </TableContainer>
    
  )
}

export default PickupTableSkeleton
