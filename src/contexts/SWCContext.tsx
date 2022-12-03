import { ChainId } from '@biconomy/core-types';
import SmartAccount from '@biconomy/smart-account';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

interface swcContextType {
  scwAddress: string;
  scwAccount: SmartAccount | null;
}

export const SWCContext = createContext<swcContextType>({
  scwAddress: '',
  scwAccount: null,
});

export const useSWCContext = () => useContext(SWCContext);

export const SWCProvider = ({ children }: any) => {
  const { ethProvider, address } = useAuthContext();
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState('');

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress('');
      if (!!address && !!ethProvider) {
        const smartAccount = new SmartAccount(ethProvider, {
          activeNetworkId: ChainId.POLYGON_MUMBAI,
          supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        });
        await smartAccount.init();

        console.log("smartAccount" , smartAccount);
        const context = smartAccount.getSmartAccountContext();
        setScwAddress(context.baseWallet.getAddress());
        setSmartAccount(smartAccount);
      }
    }
    if (!!address && !!ethProvider) {
      console.log(address);
      setupSmartAccount();
    }
  }, [ethProvider, address]);

  return (
    <SWCContext.Provider
      value={{
        scwAddress: scwAddress,
        scwAccount: smartAccount,
      }}
    >
      {children}
    </SWCContext.Provider>
  );
};
