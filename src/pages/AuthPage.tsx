import { Button, Flex } from '@chakra-ui/react';

export const AuthPage = () => {
  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Button colorScheme={"twitter"} >Continue with Twitter</Button>
    </Flex>
  );
};
