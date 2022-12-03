import { Badge, Box, Flex, IconButton, Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Text, Input } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { IoMdWallet } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
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
            </CardFooter>
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
