import {
  Badge,
  Box,
  Flex,
  IconButton,
  Button,
  Grid,
  GridItem,
  Heading,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import { Card, CardHeader, CardBody, CardFooter, Text, Input } from '@chakra-ui/react';
import Image from 'next/image';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { createGoal } from '../services/goal';

function createGroup() {

}

export default function CreateScreen() {
  const toast = useToast();
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
          Create Group
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
            placeholder="Enter Group Name"
            overflow="hidden"
            fontSize={'20px'}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
        </GridItem>

        <GridItem
          rowSpan={4}
          colSpan={5}
        >
          <Input
            bg={'#333333'}
            p={'17px'}
            margin="4px"
            color={'white'}
            variant="unstyled"
            placeholder="Enter Name"
            overflow="hidden"
            fontSize={'20px'}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
         </GridItem>
         <GridItem
          rowSpan={5}
          colSpan={5}
        >
            <Input
            bg={'#333333'}
            p={'17px'}
            color={'white'}
            variant="unstyled"
            placeholder="Enter Address"
            overflow="hidden"
            fontSize={'20px'}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
              <Button
                bg="#c9f99c"
                mt={6}
              >
                +
              </Button>
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
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem
          rowSpan={4}
          colSpan={5}
          alignItems={'center'}
        >
          <Button
            bg="#c9f99c"
            size="lg"
            ml={'5rem'}
            onClick={async () =>
              toast({
                title: 'Group created.',
                description: "We've created your Group Sucessfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }
          >
            Create Group
          </Button>
        </GridItem>
      </Grid>
    </Flex>
  );
}
