import { Button, Flex } from '@chakra-ui/react';
import { Web3AuthCore } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';

interface Props {
  setConnectedProvider: (arg0: ethers.providers.Web3Provider) => void;
}

export const AuthScreen = ({ setConnectedProvider }: Props) => {
  const [web3AuthCore, setWeb3AuthCore] = useState<Web3AuthCore | null>(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      setWeb3AuthCore(
        new Web3AuthCore({
          clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
          chainConfig: {
            chainNamespace: 'eip155',
            chainId: '0x13881',
            rpcTarget: 'https://rpc.ankr.com/polygon_mumbai',
            displayName: 'Polygon Mainnet',
            blockExplorer: 'https://mumbai.polygonscan.com/',
            ticker: 'MATIC',
            tickerName: 'Matic',
          },
        })
      );
    };
    if (!web3AuthCore) {
      initWeb3Auth();
    }
  });

  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        src={'/assets/gullak-transparent.png'}
        alt={'logo'}
        width={512}
        height={512}
      />
      <Button
        colorScheme="gray"
        leftIcon={<FaGoogle />}
        onClick={async () => {
          const adapter = new OpenloginAdapter({
            adapterSettings: {
              network: 'testnet',
              clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
              uxMode: 'popup',
              loginConfig: {
                google: {
                  name: 'google auth',
                  verifier: 'gullak-google-auth',
                  typeOfLogin: 'google',
                  clientId: '133068444239-ovk7ci0m4k5rdq3r7bc6q3atg0vssmop.apps.googleusercontent.com',
                },
              },
            },
          });
          web3AuthCore?.configureAdapter(adapter);
          await web3AuthCore?.init();
          await web3AuthCore?.connectTo(adapter.name, { loginProvider: 'google' });
          if (web3AuthCore?.provider) {
            const web3Provider = new ethers.providers.Web3Provider(web3AuthCore?.provider);
            setConnectedProvider(web3Provider);
            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            console.log(address);
          }
        }}
        width={72}
        borderRadius={32}
        mb={4}
      >
        Continue with Google
      </Button>
      <Button
        colorScheme="twitter"
        leftIcon={<FaTwitter />}
        onClick={async () => {
          const adapter = new OpenloginAdapter({
            adapterSettings: {
              network: 'testnet',
              clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
              uxMode: 'popup',
              loginConfig: {
                jwt: {
                  name: 'any name',
                  verifier: 'gullak-twitter-auth',
                  typeOfLogin: 'jwt',
                  clientId: 'EfCALmlkrAAtUw8N94aRii2wVqNgzm4p',
                },
              },
            },
          });
          web3AuthCore?.configureAdapter(adapter);
          await web3AuthCore?.init();
          await web3AuthCore?.connectTo(adapter.name, {
            loginProvider: 'jwt',
            extraLoginOptions: {
              domain: 'https://dev-3a3ecbqhdt00k46g.us.auth0.com',
              verifierIdField: 'sub',
            },
          });
          if (web3AuthCore?.provider) {
            const web3Provider = new ethers.providers.Web3Provider(web3AuthCore?.provider);
            setConnectedProvider(web3Provider);
            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            console.log(address);
          }
        }}
        width={72}
        borderRadius={32}
      >
        Continue with Twitter
      </Button>
    </Flex>
  );
};
