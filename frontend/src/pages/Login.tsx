import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages
  const navigate = useNavigate();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      await login(email, password);
      navigate('/'); // Redirect to the homepage on successful login
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials and try again.'); // Set error message
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <VStack spacing={4} align="stretch">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
        )}
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <form onSubmit={submitLogin}>
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text mt={1} fontSize="sm" color="gray.600">
                We'll never share your email with anyone else.
              </Text>
            </FormControl>
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
