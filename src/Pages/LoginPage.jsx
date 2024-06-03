import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import authenticationData from '../utils/Authentication.json';
import ToggleTheme from '../Components/ToggleTheme';

const LoginPage = ({ setIsLogin }) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('green.100', 'gray.700');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // setError('');
  }, [username, password]);

  const handleLogin = () => {
    const user = authenticationData.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      setError(''); // Clear any previous errors
      localStorage.setItem('isLogin', 'true'); // Set the 'isLogin' key in local storage
      setIsLogin(true); // Update the login state in the parent component
      navigate('/'); // Redirect to the home page
    } else {
      setError('Invalid username or password');
      setPassword("");
      setUsername("");
    }
  };

  const handleGetDummyCredential = () => {
    // Get a random index within the range of the authentication data array
    const randomIndex = Math.floor(Math.random() * authenticationData.length);
    // Get the username and password from the random index
    const { username, password } = authenticationData[randomIndex];
    // Set the username and password state
    setUsername(username);
    setPassword(password);
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" padding="309px" flexDirection="column">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        width="500px"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Username"
          variant="filled"
          mb={3}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setError("")} // Clear error message on focus
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setError("")} // Clear error message on focus
        />
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Button colorScheme="teal" mb={4} onClick={handleLogin}>
          Log In
        </Button>
        <Button mb={4} onClick={handleGetDummyCredential}>
          Get Dummy Credential
        </Button>
        <ToggleTheme />
      </Flex>
    </Flex>
  );
};

export default LoginPage;
