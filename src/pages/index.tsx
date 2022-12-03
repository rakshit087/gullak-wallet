import { Badge, Box, Flex, IconButton, Button, Grid, GridItem } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { IoMdWallet } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DashboardScreen() {
  const { address } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!address) {
      router.push('/auth');
    }
  });
  return (
    <Flex direction={'column'}>
      <Flex
        h={'100vh'}
        bgColor={'#252528'}
        w={'full'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          bg="#c9f99c"
          h="50%"
          w="100%"
          p={4}
          borderRadius="3xl"
          overflow="hidden"
          boxSize="60vh"
          mt={-400}
          color="black"
        >
          <IconButton
            pt={0}
            pl={300}
            variant="unStyle"
            fontSize="30px"
            h="50%"
            w="100%"
            aria-label="Wallet icon"
            icon={<IoMdWallet />}
          ></IconButton>
          <Box
            w="100%"
            pl={4}
            fontSize="xl"
            fontWeight="bold"
            color="black"
          >
            <Badge
              bg="#c9f99c"
              fontSize="2em"
              color="black"
            >
              $ 500
            </Badge>
          </Box>
          <Box
            w="100%"
            pt={75}
            pl={110}
          >
            <Badge
              bg="#c9f99c"
              fontSize="12px"
              fontWeight={0.8}
            >
              Wallet Address
            </Badge>
          </Box>
          <Box
            w="100%"
            pt={0}
            mt="-1"
            pl={118}
          >
            <Badge
              bg="#c9f99c"
              fontSize="12px"
              as={'p'}
              className="txt"
            >
              0x124...36484
            </Badge>
            <IconButton
              mt={0}
              ml={-3}
              variant="unstyle"
              fontSize="10px"
              aria-label="Copy icon"
              onClick={() => {
                copy('Text');
              }}
              icon={<FiCopy />}
            ></IconButton>
          </Box>
        </Box>
      </Flex>
      <Grid
        h="200px"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        mt={-300}
        ml={'5'}
        mr={'5'}
      >
        <GridItem
          rowSpan={4}
          colSpan={5}
        >
          <Card
            bg={'#333333'}
            overflow="hidden"
          >
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              flexDirection={'row'}
              sx={{
                '& > button': {
                  minW: '10px',
                },
              }}
            >
              <Text color={'white'}>Trip to Goa</Text>
              <Button mt={-2}>$ 500</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>

      <IconButton
        variant={'floating'}
        pos="fixed"
        w="50px"
        h="50px"
        bg={'#c9f99c'}
        ml={'47vh'}
        mt={'90vh'}
        aria-label="add btn"
        icon={<AiOutlinePlus />}
      ></IconButton>
    </Flex>
  );
}
