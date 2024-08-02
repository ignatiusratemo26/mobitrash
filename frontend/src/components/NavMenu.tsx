import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const itemBg = useColorModeValue('white', 'gray.600');
  const itemColor = useColorModeValue('black', 'white');

  return (
    <Box as="a" href={to} display="block" p={2} my={2} bg={itemBg} color={itemColor} rounded="md" shadow="md">
      {children}
    </Box>
  );
};

const NavMenu: React.FC = () => {
  return (
    <Box>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/pickup_requests">Pickup Requests</NavItem>
      <NavItem to="/payments">Payments</NavItem>
      <NavItem to="/help_support">Help & Support</NavItem>
    </Box>
  );
};

export default NavMenu;
