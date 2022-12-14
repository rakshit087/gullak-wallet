import { Flex, IconButton, Button, Grid, GridItem } from '@chakra-ui/react';
import { Card, CardFooter, Text } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { WalletBox } from '../components/WalletBox';
import Link from 'next/link';
import { groupData } from '../data/groups';
import * as dotenv from 'dotenv';
dotenv.config()

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
      >
        <WalletBox />
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
          {groupData.map((group) => (
            <Card
              bg={'#333333'}
              overflow="hidden"
              mb={4}
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
                <Text color={'white'}>{group.name}</Text>
                <Button mt={-2}>$ {group.amount}</Button>
              </CardFooter>
            </Card>
          ))}
        </GridItem>
      </Grid>
      <Link href="/Create">
        <IconButton
          variant={'floating'}
          pos="fixed"
          w="50px"
          h="50px"
          bg={'#c9f99c'}
          ml={'47vh'}
          mt={'2vh'}
          aria-label="add btn"
          icon={<AiOutlinePlus />}
        ></IconButton>
      </Link>
    </Flex>
  );
}
