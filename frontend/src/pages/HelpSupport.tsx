import { Card, Flex, Grid, Heading, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react'

const HelpSupport = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const cardColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <>
    <Grid>
      
    </Grid>

    
      <Flex align='center' justify='center' p='22px' width='100%'>
        <Heading fontSize={isMobile ? 'md': 'lg'} fontWeight='bold' alignContent='center'>
          Help and Support
        </Heading>
      </Flex>

       
      <Grid 
      templateColumns={{ base: 'repeat(3, 1fr)' }} gap={1}
      width={{ base: '100%', md: '80%' }}
      justifyContent={{ base: 'center', md: 'space-between' }}
      ml={{ base: 0, md: '8%' }}
      >
        <Card
        bg={cardColor}
        boxShadow={'lg'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderRadius='2'
        borderBottomLeftRadius='40'
        p={3}
        m={ isMobile ? 1 : 6 }
        size={ isMobile ? 'sm' : 'md' }
        >
          <Text fontSize={ isMobile ? 'xs' : 'md' }  >
            Enjoy 24 hour services, with fast responses
            
          </Text>
          
        </Card>
          
        <Card
        bg={cardColor}
        boxShadow={'lg'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderRadius='2'
        p={3}
        m={ isMobile ? 1 : 6 }
        size={ isMobile ? 'sm' : 'md' }
        >
          <Text fontSize={ isMobile ? 'xs' : 'md' } >
              Our call center works all over the country and every day our company gets bigger and better.
          </Text>
        </Card>
          
        <Card
        bg={cardColor}
        boxShadow={'lg'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderRadius='2'
        borderTopRightRadius='40'
        size={ isMobile ? 'sm' : 'md' }
        p={3}
        m={ isMobile ? 1 : 6 }
        >
          <Text fontSize={ isMobile ? 'xs' : 'md' }  >
              We speak 33 different languages.
              feel free to use the language of your choice
          </Text>
        </Card>
      </Grid>
    </>
  )
}

export default HelpSupport
