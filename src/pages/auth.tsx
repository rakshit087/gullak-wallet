import { Button, Flex } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { loginWithGoogle, loginWithTwitter } from '../services/autentication';

export default function AuthPage() {
  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Button
        colorScheme="gray"
        leftIcon={<FaGoogle />}
        onClick={() => {
          loginWithGoogle();
        }}
      >
        Continue with Google
      </Button>
      <Button
        colorScheme="twitter"
        leftIcon={<FaGoogle />}
        onClick={() => {
          loginWithTwitter();
        }}
      >
        Continue with Twitter
      </Button>
    </Flex>
  );
};
