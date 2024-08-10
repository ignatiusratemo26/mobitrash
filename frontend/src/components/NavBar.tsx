import { Box, Flex, Image, Input, AvatarGroup, Avatar, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg';
import ColorModeSwitch from './ColorModeSwitch';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box as="header" bg="blue.500" p={3}>
      <Flex justify="space-between" align="center">
        <Image src={logo} boxSize='60px' />
        <Text as="h1" fontSize="2xl" fontWeight="bold" color="white">Welcome, {currentUser?.first_name}!</Text>
        <Input placeholder="Search..." width="300px" />
        <ColorModeSwitch />
        
        <AvatarGroup spacing='1rem'>
          <Avatar bg='grey.500' name={`${currentUser?.first_name} ${currentUser?.last_name}`}  />
        </AvatarGroup>
        <Button colorScheme="red" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default NavBar;
