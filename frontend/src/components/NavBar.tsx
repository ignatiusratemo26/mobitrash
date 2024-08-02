import { HStack, Image, Text, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import logo from '../assets/react.svg'
import { Box, Flex, Input, Heading } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';
import { color } from 'framer-motion';

const NavBar = () =>{
    return(
        <Box as="header" bg="blue.500" p={3}>
        <Flex justify="space-between" align="center">
            <Image src={logo} boxSize='60px'/>
            <Input placeholder="Search..."  width="300px" />
            <ColorModeSwitch />
            <AvatarGroup spacing='1rem'>
                <Avatar bg='grey.500' name='Iggy Ratemo' />
                <Avatar bg='teal.500' />
            </AvatarGroup>
        </Flex>
        </Box>

    )
}
export default NavBar;