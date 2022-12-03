import { Badge, Box, Flex, IconButton, Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  ModalCloseButton,
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { IoMdWallet } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';

export default function WalletScreen() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
        >
          <Input
            bg={'#333333'}
            p={'17px'}
            color={'white'}
            variant="unstyled"
            placeholder="Enter Amount"
            overflow="hidden"
            fontSize={'20px'}
            ml={70}
            w={'full'}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
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
            h="12"
            ml={13}
          >
            Add Funds
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
            h="12"
            ml={13}
          >
            Send Funds
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="First name"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="Last name" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
      </Grid>
    </Flex>
  );
}
