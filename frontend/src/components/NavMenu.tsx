import React from 'react';
import { Box, useColorModeValue, Icon, useMediaQuery, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { FaHome, FaTruck, FaDollarSign, FaQuestionCircle, FaBars, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavItem: React.FC<{ to: string; icon: any; children: React.ReactNode }> = ({ to, icon, children }) => {
  const itemBg = useColorModeValue('white', 'gray.600');
  const itemColor = useColorModeValue('black', 'white');

  

  return (
    <Box as={Link} to={to} display="flex" alignItems="center" p={2} my={2} bg={itemBg} color={itemColor} rounded="md" shadow="md">
      <Icon as={icon} mr={2} />
      {children}
    </Box>
  );
};

const NavMenu: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const menuItems = (
    <>
      <NavItem to="/" icon={FaHome}>Home</NavItem>
      <NavItem to="/profile" icon={FaUser}>My Profile</NavItem>
      <NavItem to="/pickup-requests" icon={FaTruck}>Pickup Requests</NavItem>
      <NavItem to="/payments" icon={FaDollarSign}>Payments</NavItem>
      <NavItem to="/support" icon={FaQuestionCircle}>Help & Support</NavItem>
    </>
  );


  return (
    <Box>
      {isMobile ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<FaBars />} />
          <MenuList>
            <MenuItem as={Link} to="/">
              <Icon as={FaHome} mr={2} />
              Home
            </MenuItem>
            <MenuItem as={Link} to="/profile">
              <Icon as={FaUser} mr={2} />
              My Profile
            </MenuItem>
            <MenuItem as={Link} to="/pickup-requests">
              <Icon as={FaTruck} mr={2} />
              Pickup Requests
            </MenuItem>
            <MenuItem as={Link} to="/payments">
              <Icon as={FaDollarSign} mr={2} />
              Payments
            </MenuItem>
            <MenuItem as={Link} to="/support">
              <Icon as={FaQuestionCircle} mr={2} />
              Help & Support
            </MenuItem>
          </MenuList>
        </Menu>

      ) : (
        menuItems
      )}
    </Box>
  );
};

export default NavMenu;
