import { ethers } from 'ethers'; 
import { Web3AuthCore } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {useRouter} from "next/router";

interface authContextType {
  ethProvider: ethers.providers.Web3Provider | null;
  address: string | undefined;
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
  const [web3AuthCore, setWeb3AuthCore] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string>();
  const router = useRouter();

  const initWeb3AuthCore = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (web3AuthCore?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(web3AuthCore.provider);
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      return;
    }
    if (web3AuthCore) {
      return web3AuthCore;
    }
    const sdk = new Web3AuthCore({
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
    });
    setWeb3AuthCore(sdk);
    return web3AuthCore;
  }, [web3AuthCore]);

  useEffect(() => {
    initWeb3AuthCore();
  },[web3AuthCore]);

  const connectWithGoogle = useCallback(async () => {
    const adapter = new OpenloginAdapter({
      adapterSettings: {
        network: 'testnet',
        clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
        uxMode: 'redirect',
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
    try {
      const user = await web3AuthCore?.getUserInfo();
      if(user?.email){
        await web3AuthCore?.logout()
        await web3AuthCore?.connectTo(adapter.name, { loginProvider: 'google' });
      } 
    } catch {
      await web3AuthCore?.connectTo(adapter.name, { loginProvider: 'google' });
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
  }, [web3AuthCore]);

  return (
    <AuthContext.Provider
      value={{
        ethProvider: provider,
        address: account,
        connectGoogle: connectWithGoogle,
        connectTwitter: connectWithTwitter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
