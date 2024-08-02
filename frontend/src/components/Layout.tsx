import React from 'react';
import { Box, Flex, Input, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <Flex direction="column" height="100vh">
      <Box as="header" bg="teal.500" p={4}>
        <Flex justify="space-between" align="center">
          <Heading color="white">My App</Heading>
          <Input placeholder="Search..." width="300px" />
        </Flex>
      </Box>
      <Flex flex="1">
        <Box as="nav" width="250px" bg="gray.200" p={4}>
          <NavMenu />
        </Box>
        <Box as="main" flex="1" p={4} bg="gray.50">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

const NavMenu: React.FC = () => {
  return (
    <Box>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/page1">Pickup Requests</NavItem>
      <NavItem to="/page2">Payments</NavItem>
      <NavItem to="/page3">Help & Support</NavItem>
    </Box>
  );
};

const NavItem: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Box as="a" href={to} display="block" p={2} my={2} bg="white" rounded="md" shadow="md">
      {children}
    </Box>
  );
};

export default Layout;
