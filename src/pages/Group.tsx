import { Badge, Box, Flex, IconButton, Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Text, Input } from '@chakra-ui/react';
import Image from 'next/image';
import { BiMessageRoundedDots } from 'react-icons/bi';

export const GroupScreen = () => {
  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid
        h="200px"
        w={'600px'}
        templateColumns="repeat(5, 1fr)"
        gap={4}
        mt={-400}
        ml={'5'}
        mr={'5'}
      >
        <GridItem
          rowSpan={4}
          colSpan={4}
          fontSize={'24px'}
          fontWeight={'bold'}
          color={'white'}
          ml={'100px'}
        >
          Trip to Goa
        </GridItem>
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
              <Text color={'white'}>Member 1</Text>
              <IconButton
                variant="unStyle"
                fontSize="30px"
                color={'white'}
                aria-label="Wallet icon"
                mt={-2}
                icon={<BiMessageRoundedDots />}
              ></IconButton>
            </CardFooter>
          </Card>
        </GridItem>
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
              <Text color={'white'}>Member 2</Text>
              <IconButton
                variant="unStyle"
                fontSize="30px"
                color={'white'}
                aria-label="Wallet icon"
                mt={-2}
                icon={<BiMessageRoundedDots />}
              ></IconButton>
            </CardFooter>
          </Card>
        </GridItem>
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
              <Text color={'white'}>Member 3</Text>
              <IconButton
                variant="unStyle"
                fontSize="30px"
                color={'white'}
                aria-label="Wallet icon"
                mt={-2}
                icon={<BiMessageRoundedDots />}
              ></IconButton>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem
          rowSpan={4}
          colSpan={5}
          color={'white'}
          fontSize={'24px'}
          fontWeight={'bold'}
          ml={'90'}
        >
          Total:- $ 500
        </GridItem>
        <GridItem
          rowSpan={4}
          colSpan={5}
        >
          <Input
            bg={'#333333'}
            p={'17px'}
            color={'white'}
            variant="unstyled"
            placeholder="Enter Amount "
            overflow="hidden"
            fontSize={'20px'}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
        </GridItem>

        <GridItem
          rowSpan={4}
          colSpan={5}
          alignItems={'center'}
          ml={'10'}
        >
          <Button
            bg="#c9f99c"
            size="lg"
          >
            Make Withdraw Request
          </Button>
        </GridItem>
      </Grid>
    </Flex>
  );
};
