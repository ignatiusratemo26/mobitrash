import { Box, Flex, Image, Input, AvatarGroup, Avatar,
   Menu, MenuList, MenuItem, MenuButton, Icon, 
   useColorMode, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/LOGO.png';
import useAuth from '../hooks/useAuth';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { FaCalendar, FaMoon, FaSignOutAlt, FaSun, FaUser } from 'react-icons/fa';
import useLogout from '../hooks/useLogout';

const NavBar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const handleLogout= useLogout();
  return (
    <Box as="header" bg="blue.500" p={3}>
      <Flex justify="space-between" align="center">
      
        <Image 
          src={logo} 
          boxSize="auto" // Set boxSize to auto to allow responsive sizing
          maxWidth="100px" // You can adjust maxWidth as needed
          height="auto" 
          objectFit="contain" // Maintains aspect ratio
        />


        <InputGroup width="300px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.700" />}
          />
          <Input 
            placeholder="Search..." 
            borderColor="gray.700" 
            _placeholder={{ color: 'gray.700' }}
          />
        </InputGroup>
        <Menu>
          <MenuButton> 
          <AvatarGroup spacing='1rem '>
              { currentUser ?
              <Avatar bg='grey.500' name={`${currentUser?.first_name} ${currentUser?.last_name}`} /> : <Avatar bg='teal.500' />  }
            </AvatarGroup>
          </MenuButton>

          <MenuList>
            <MenuItem icon={<FaUser />} onClick={() => navigate('/profile')}>
                My Profile
            </MenuItem>            
            <MenuItem icon={<FaCalendar />} onClick={() => navigate('/my_requests')}>
              My requests
            </MenuItem>
            <MenuItem icon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />} onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </MenuItem>
            <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>

      </Flex>
    </Box>
  );
}

export default NavBar;
