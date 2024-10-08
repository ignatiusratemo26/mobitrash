import { Box, Flex, Image, Input, AvatarGroup, Avatar,
   Menu, MenuList, MenuItem, MenuButton, Icon, 
   useColorMode, InputGroup, InputLeftElement, 
   useColorModeValue,
   useMediaQuery} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/mobitrash-logo-white.png';
import useAuth from '../hooks/useAuth';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { FaCalendar, FaMoon, FaSignOutAlt, FaSun, FaUser } from 'react-icons/fa';
import useLogout from '../hooks/useLogout';
import NavMenu from './NavMenu';

const NavBar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const handleLogout= useLogout();
  const navBg = useColorModeValue('gray.200', 'gray.700');
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const navBgImage = "https://source.unsplash.com/random";
  
  return (
    <Box as="header" bg="blue.500" p={3} zIndex={4} >

      <Flex justify="space-between" align="center">
        <Image 
          src={logo} 
          boxSize="auto" 
          maxWidth="35px" 
          height="auto" 
          objectFit="contain" 
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
            size={isMobile ? "sm" : "md"}
          />
        </InputGroup>
        <Menu>
          <MenuButton> 
          <AvatarGroup spacing='1rem '>
              { currentUser ?
              <Avatar bg='grey.500' name={`${currentUser?.first_name} ${currentUser?.last_name}`} size={isMobile ? "sm" : "md"} /> 
              : 
              <Avatar bg='teal.500' size={isMobile ? "sm" : "md"} />  }
            </AvatarGroup>
          </MenuButton>

          <MenuList>
            <MenuItem icon={<FaUser />} onClick={() => navigate('/profile')}>
                My Profile
            </MenuItem>            
            <MenuItem icon={<FaCalendar />} onClick={() => navigate('/pickup-requests')}>
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

        { isMobile && (
          <NavMenu />
        )}

      </Flex>
    </Box>
  );
}

export default NavBar;
