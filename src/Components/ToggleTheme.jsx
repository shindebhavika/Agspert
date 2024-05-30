import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}>
      {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}

export default ToggleTheme;
