import { Box, IconButton, Badge, Flex, Text } from '@chakra-ui/react';
import { SkeletonText } from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { IoMdWallet } from 'react-icons/io';
import copy from 'copy-to-clipboard';
import { useSWCContext } from '../contexts/SWCContext';
import { BalancesDto } from '@biconomy/node-client';
import { ChainId } from '@biconomy/core-types';
import { useEffect, useState } from 'react';

export const WalletBox = () => {
  const { scwAccount, scwAddress } = useSWCContext();
  const [scwAccountBal, setScwAccountBal] = useState<any>(null);

  useEffect(() => {
    if (scwAccount) {
      const balanceParams: BalancesDto = {
        chainId: ChainId.POLYGON_MUMBAI, // chainId of your choice
        eoaAddress: scwAccount?.address,
        tokenAddresses: ["0xe7863D24948D223678F47A45987Ff05786BE0e72"],
      };
      scwAccount.getAlltokenBalances(balanceParams).then((resData)=>{
        setScwAccountBal(((resData.data[0].balance/1e18).toFixed(2)).toString())
      });
    }
  }, [scwAccount, scwAddress]);

  return (
    <Flex
      bg="#c9f99c"
      h="50%"
      w="100%"
      color="black"
      borderBottomRadius={'3xl'}
      flexDir={'column'}
      justifyContent={'space-between'}
    >
      {/* Wallet Icon */}
      <Flex
        w={'full'}
        justifyContent={'right'}
      >
        <IconButton
          variant="unStyle"
          aria-label="WalletIcon"
          fontSize={'24px'}
          icon={<IoMdWallet />}
          mr={2}
          mt={2}
        />
      </Flex>
      {/* Account Balance */}
      <Flex ml={6}>
        <Text fontSize={'5xl'}>$</Text>
        {(scwAccountBal) ? <Text
          fontSize={'6xl'}
          fontWeight={'semibold'}
          fontFamily={'mono'}
        >
          {scwAccountBal}
        </Text> : <SkeletonText noOfLines={1} height={4} colorScheme={"gray"} />}
      </Flex>
      <Box
        marginX={'auto'}
        mb={4}
        textAlign={'center'}
      >
        <Text fontSize={'sm'}>Wallet Address</Text>
        <Flex alignItems={'center'}>
          <Text
            fontSize={'xs'}
            fontWeight={'semibold'}
          >
            {scwAddress ? (
              scwAddress.slice(0, 5) + '...' + scwAddress.slice(-4)
            ) : (
              <SkeletonText
                size={'sm'}
                noOfLines={1}
                colorScheme={"gray"}
              />
            )}
          </Text>
          <IconButton
            height={'10px'}
            variant="unstyle"
            fontSize="10px"
            aria-label="Copy icon"
            onClick={() => {
              copy(scwAddress);
            }}
            icon={<FiCopy />}
          ></IconButton>
        </Flex>
      </Box>
    </Flex>
  );
};
