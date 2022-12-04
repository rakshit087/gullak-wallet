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

  const getBalances = async () => {
    if (scwAccount) {
      const balanceParams: BalancesDto = {
        chainId: ChainId.POLYGON_MUMBAI, // chainId of your choice
        eoaAddress: scwAccount?.address,
        tokenAddresses: [],
      };
      const usdBalFromSdk = await scwAccount.getTotalBalanceInUsd(balanceParams);
      console.log()
      return usdBalFromSdk;
    }
    return null;
  };

  const [scwAccountBal, setScwAccountBal] = useState<any>("0");

  useEffect(() => {
    const bal = getBalances();
    setScwAccountBal(bal);
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
      <Flex>
          <Text fontSize={'5xl'}>$</Text>
          <Text
            fontSize={'6xl'}
            fontWeight={'semibold'}
          >
            {scwAccountBal.toString()}
          </Text>
        </Flex>
      <Box>
        <Text>Wallet Address</Text>
      </Box>
      {/* <Box>
        <Text>Wallet Address</Text>
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
        ></IconButton> */}
      {/* </Box> */}
    </Flex>
  );
};
