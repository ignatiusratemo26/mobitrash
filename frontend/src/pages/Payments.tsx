import { useColorModeValue,
  Box, Heading, Flex, Icon, Text, Button, Stack, 
  useMediaQuery, Card,
  Grid,
  GridItem,
  Input,
  Divider,
  useDisclosure,
  Collapse
} from '@chakra-ui/react'

import React from 'react'
import { FaAddressBook, FaDollarSign, FaDownload, FaEnvelope, FaMoneyBill, FaPhone, FaSignOutAlt } from 'react-icons/fa'
import PaymentsTable from '../components/PaymentsTable';

const Payments = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onToggle } = useDisclosure();
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

        
        <Heading fontSize={ isMobile ? 'xl' : '2xl'} fontFamily={'body'}
          px={3} ml={2} whiteSpace="no-wrap"
        >
          Payments
        </Heading>

        <Text mr={3} fontSize={ isMobile ? 'xs' : 'sm' } 
          color={useColorModeValue('gray.700', 'gray.400')} 
          px={3} py={2} ml={2} whiteSpace="no-wrap"
        >
          Update your payment information or change your plan according to your needs. 
        </Text>
      
        <Card
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          rounded={'lg'}
          p={6}
          mt={6}
          >

          <Grid 
            templateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(300px, 1fr))' }} 
            gap={isMobile ? 4 : 1} 
            width="100%"
            >
              <GridItem>
                <Heading fontSize={ isMobile ? 'md' : 'lg'} fontFamily={'body'}>
                  My Balance 
                </Heading>
                <Text>Ksh. 200.00</Text>

                <Stack mt={8} direction={'row'} spacing={4}>
                  <Button
                    fontSize={ isMobile ? 'xs' : 'sm'} rounded={'full'} bg={'green.400'} color={'white'} boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{bg: 'green.600',}} _focus={{bg: 'green.500',}}
                    leftIcon={<FaDollarSign />}
                    size={isMobile ? 'xs' : 'sm'}
                    onClick={onToggle}
                  >
                    Top Up
                  </Button>

                  <Button
                    fontSize={ isMobile ? 'xs' : 'sm'} rounded={'full'} bg={'purple.400'} color={'white'} boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'purple.600',
                    }}
                    _focus={{
                      bg: 'purple.500',
                    }}
                    leftIcon={<FaMoneyBill />}
                    size={isMobile ? 'xs' : 'sm'}
                    onClick={onToggle}
                  >
                    Withdraw
                  </Button>

                  </Stack>
              </GridItem>
            </Grid>

            <Collapse in={isOpen} animateOpacity>
              <Divider orientation='vertical' />
            <Grid
            templateColumns={{ base: '6fr', md: '1fr 1fr' }}
            gap={isMobile ? 4 : 6}
            mt={4}
            >
              <GridItem mr={5} >
                <Flex direction='row' justify='space-between' >
                    
                  <Text m={2} fontSize={ isMobile ? 'sm' : 'md'}>Phone Number</Text>
                  <Input size={ isMobile ? 'xs' : 'sm'  }
                  variant='flushed' 
                  mr={2}
                  width="auto"
                  maxWidth="150px" 
                  flexShrink={1}  
                  />
                </Flex>
                <Flex direction='row' justify='space-between' >
                  <Text m={2} fontSize={ isMobile ? 'sm' : 'md'}>Enter Amount</Text>
                  <Input size={ isMobile ? 'xs' : 'sm' } variant='flushed' placeholder='Amount in Ksh. '
                  mr={2}    
                  width="auto"
                  maxWidth="150px" 
                  flexShrink={1}                    
                  />
                </Flex>
                <Button
                  fontSize={ isMobile ? 'xs' : 'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.600', 
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                  leftIcon={<FaSignOutAlt />}
                  size={isMobile ? 'xs' : 'sm'}
                  mt={4}
                  ml={2}
                >
                  Submit
                </Button>

              </GridItem>


            </Grid>          
          </Collapse>          
        </Card>
        
        <Flex direction='row' justify='space-between'>
          <Flex direction='column' >
            <Heading fontSize={ isMobile ? 'sm' : 'md'} fontFamily={'body'} 
            mt={5} 
            px={3} ml={2} whiteSpace="no-wrap"
            >
            Payment History 23
            </Heading>

            <Text mr={3} fontSize={ isMobile ? 'xs' : 'sm' } 
            px={3} py={2} ml={2} whiteSpace="no-wrap"
            color={useColorModeValue('gray.700', 'gray.400')} 
            >
              See your payment history below.
            </Text>
          </Flex>
          
          <Button 
          fontSize={ isMobile ? 'xs' : 'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'blue.600', 
          }}
          _focus={{
            bg: 'blue.500',
          }}
          leftIcon={<FaDownload />}
          size={isMobile ? 'xs' : 'sm'}
          mt={6}
          >
            download all
          </Button>
        </Flex>

        <PaymentsTable />

      </Box>
    </Box>
    </>
  )
}

export default Payments
