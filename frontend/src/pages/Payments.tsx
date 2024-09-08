import { useColorModeValue,
  Box, Heading, Flex, Icon, Text, Button, Stack, 
  useMediaQuery, Card} from '@chakra-ui/react'

import React from 'react'
import { FaAddressBook, FaDollarSign, FaDownload, FaEnvelope, FaMoneyBill, FaPhone, FaSignOutAlt } from 'react-icons/fa'

const Payments = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  
  return (
    <>
      
      <Box py={6}>
      <Box
        maxW={'1080px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        whiteSpace={'no-wrap'}
        >

        
        <Heading fontSize={ isMobile ? 'xl' : '2xl'} fontFamily={'body'}>
          Payments
        </Heading>

        <Text mr={3} fontSize={ isMobile ? 'xs' : 'sm' } >Update your payment information or change your plan according to your needs. </Text>
      
        <Card
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          rounded={'lg'}
          p={6}
          mt={6}
          >
          <Heading fontSize={ isMobile ? 'sm' : 'md'} fontFamily={'body'}>
            My Balance 
          </Heading>
          <Text>Ksh. 200.00</Text>
          

          <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            fontSize={'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'green.600',
            }}
            _focus={{
              bg: 'green.500',
            }}
            leftIcon={<FaDollarSign />}
          >
            Top Up
          </Button>

          <Button
            fontSize={'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'purple.600',
            }}
            _focus={{
              bg: 'purple.500',
            }}
            leftIcon={<FaMoneyBill />}
          >
            Withdraw
          </Button>

          </Stack>

          
        </Card>

          <Heading fontSize={ isMobile ? 'sm' : 'md'} fontFamily={'body'} mt={5} >
          Payment History 23
          </Heading>

          <Text mr={3} fontSize={ isMobile ? 'xs' : 'sm' } >Update your payment information or change your plan according to your needs. </Text>

        <Flex align='center'>
            <Icon as={FaEnvelope} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Transaction id: ewr033nf3ne
            </Text>
        </Flex>

        <Flex align='center'>
            <Icon as={FaPhone} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Amount: $100
            </Text>
        </Flex>
        <Flex align='center'>
            <Icon as={FaAddressBook} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Date: 12th August 2021
            </Text>
        </Flex>

        {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #green_planet
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #requests
          </Badge>
        </Stack> */}

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button

            
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
            leftIcon={<FaSignOutAlt />}
            >
            Logout
          </Button>
          <Button
            onClick={() => console.log('Edit profile')}
            flex={1} fontSize={'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.600',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            leftIcon={<FaDownload />}
            >
            Download Receipt
          </Button>
        </Stack>
      </Box>
    </Box>
    </>
  )
}

export default Payments
