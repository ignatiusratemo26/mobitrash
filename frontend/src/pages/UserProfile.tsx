import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Adjust import based on your file structure
import useAuth from '../hooks/useAuth';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FaAddressBook, FaAddressCard, FaEdit, FaEnvelope, FaIcons, FaMailBulk, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import useLogout from '../hooks/useLogout';

export default function UserProfile() {
    const { currentUser } = useAuth();
    const handleLogout = useLogout();
    const email = currentUser?.email;
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        whiteSpace={'no-wrap'}
        textAlign={'center'}>

        <Avatar
            size={'xl'} bg='blue.600'
            name={`${currentUser?.first_name} ${currentUser?.last_name}`} mb={4} pos={'relative'}
            _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
            }}
            />
        <Heading fontSize={'2xl'} fontFamily={'body'} py={4}>
            {currentUser?.first_name} {currentUser?.last_name}
        </Heading>
        <Flex align='center'>
            <Icon as={FaEnvelope} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Email: {currentUser?.email}
            </Text>
        </Flex>

        <Flex align='center'>
            <Icon as={FaPhone} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Phone: {currentUser?.phone_number}
            </Text>
        </Flex>
        <Flex align='center'>
            <Icon as={FaAddressBook} />
            <Text
            textAlign={'left'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={2} ml={2} whiteSpace="no-wrap">
                Address: {currentUser?.address}
            </Text>
        </Flex>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={handleLogout}
            
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
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            leftIcon={<FaEdit />}
            >
            Edit Profile
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}