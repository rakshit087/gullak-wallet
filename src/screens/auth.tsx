import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { useAuthContext } from '../contexts/AuthContext';

export const AuthScreen = () => {
  const {connectGoogle, connectTwitter} = useAuthContext();

  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        src={'/assets/gullak-transparent.png'}
        alt={'logo'}
        width={512}
        height={512}
      />
      <Button
        colorScheme="gray"
        leftIcon={<FaGoogle />}
        onClick={async () => {
          await connectGoogle();
        }}
        width={72}
        borderRadius={32}
        mb={4}
      >
        Continue with Google
      </Button>
      <Button
        colorScheme="twitter"
        leftIcon={<FaTwitter />}
        // onClick={async () => {
        //   await connectTwitter();
        // }}
        width={72}
        borderRadius={32}
      >
        {/* <SocialLoginDynamic /> */}
      </Button>
    </Flex>
  );
};
