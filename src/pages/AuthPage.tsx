import { Button, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { FaTwitter } from "react-icons/fa";

export const AuthPage = () => {
  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
        <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
    Continue with Twitter
  </Button>
    </Flex>
  );
};
