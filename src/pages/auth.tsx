import { Button, Flex } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
// import { loginWithTwitter } from '../services/auth';

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
          // loginWithTwitter();
        }}
      >
        Continue with Google
      </Button>
    </Flex>
  );
};
