import { Web3AuthCore } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { ethers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface authContextType {
  ethProvider: ethers.providers.Web3Provider | null;
  address: string | null;
  connectGoogle: () => Promise<any>;
  connectTwitter: () => Promise<any>;
}

export const AuthContext = createContext<authContextType>({
  ethProvider: null,
  connectGoogle: () => Promise.resolve(null),
  connectTwitter: () => Promise.resolve(null),
  address: '',
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [ethProviderState, setEthProviderState] = useState<ethers.providers.Web3Provider | null>(null);
  const [addressState, setAddressState] = useState<string | null>(null);
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
  },[]);

  const connectWithGoogle = useCallback(async () => {
    if (addressState) return;
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
      setEthProviderState(web3Provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setAddressState(address);
    }
  }, [web3AuthCore]);

  const connectWithTwitter = useCallback(async () => {
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
      setEthProviderState(web3Provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setAddressState(address);
      console.log(address);
    }
  }, [web3AuthCore]);

  return (
    <AuthContext.Provider
      value={{
        ethProvider: ethProviderState,
        address: addressState,
        connectGoogle: connectWithGoogle,
        connectTwitter: connectWithTwitter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
