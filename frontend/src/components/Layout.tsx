import React from 'react';
import { Box, Flex, useColorModeValue, useImage, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import NavMenu from './NavMenu';

const Layout: React.FC = () => {
  const navBg = useColorModeValue('gray.200', 'gray.700');
  const navBg1 = useColorModeValue("linear(to-l, #E4F3E3, #5CA9E9 )", "linear(to-l,#39304A, #2a9ebb)");
  
  const navBgImage = "../assets/images/navBg.jpg";
  const mainBg = useColorModeValue('gray.50', 'gray.800');
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  
  return (
    <Flex direction="column" height="100vh">
      <NavBar />
      <Flex flex="1">

      { !isMobile && (
        <Box as="nav" width="250px"  bgGradient={navBg1}
          borderRadius='10px' p={4}>
          <NavMenu />
        </Box>
        )}

        <Box as="main" flex="1" p={4} bg={mainBg} bgImg={navBgImage}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
