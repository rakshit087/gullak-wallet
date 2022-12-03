import { Badge, Box, Flex, IconButton, Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Text, Input } from '@chakra-ui/react';
import Image from 'next/image';
import { BiMessageRoundedDots } from 'react-icons/bi';

export default function WalletScreen() {
  return (
    <Flex>
      <Grid
        bgColor={'#252528'}
        h={'120vh'}
        w={'190vh'}
        gap={8}
        p={4}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <GridItem
          rowSpan={8}
          colSpan={9}
          bg={'#c9f99c'}
          m={'-18'}
          mt={'-20'}
          h={'50vh'}
          borderRadius="3xl"
        >
          <Card
            overflow="hidden"
            bg={'#c9f99c'}
            h={'50vh'}
            borderRadius="3xl"
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
            ></CardFooter>
          </Card>
        </GridItem>

        <GridItem
          rowSpan={4}
          colSpan={5}
          alignItems={'center'}
          ml={'10'}
          w="100%"
          h="10"
        >
          <Button
            bg="#c9f99c"
            size="lg"
            w="100%"
            h="10"
            m={-10}
          >
            Add Funds
          </Button>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={5}
          alignItems={'center'}
          ml={'10'}
          w="100%"
          h="10"
        >
          <Button
            bg="#c9f99c"
            size="lg"
            w="100%"
            h="10"
          >
            Withdraw Funds
          </Button>
        </GridItem>
        <GridItem
          rowSpan={4}
          colSpan={5}
          alignItems={'center'}
          ml={'10'}
          w="100%"
          h="10"
        >
          <Button
            bg="#c9f99c"
            size="lg"
            w="100%"
            h="10"
          >
            Send Funds
          </Button>
        </GridItem>
      </Grid>
    </Flex>
  );
}
