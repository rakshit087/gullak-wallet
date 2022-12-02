import { Web3AuthCore } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

export const loginWithTwitter = async () => {
  const web3authCore = new Web3AuthCore({
    clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
    chainConfig: {
      chainNamespace: 'eip155',
      chainId: '0x13881',
      rpcTarget: 'https://rpc.ankr.com/polygon_mumbai',
      displayName: 'Polygon Testnet',
      blockExplorer: 'https://mumbai.polygonscan.com/',
      ticker: 'MATIC',
    },
  });
  const adapter = new OpenloginAdapter({
    adapterSettings: {
      network: 'testnet',
      clientId: 'BDBRmPiihu9XDyawpU1xXD2wVpEg_XG1ZNsz2RVc910qTU-MrMvuVig6khEBNSGxJw5bjjywcZQO7GdjcwrJhAM',
      uxMode: 'redirect', // other option: popup
      loginConfig: {
        jwt: {
          name: 'twitter-auth',
          verifier: 'gullak-twitter-auth',
          typeOfLogin: 'jwt',
          clientId: 'EfCALmlkrAAtUw8N94aRii2wVqNgzm4p',
        },
      },
    },
  });
  web3authCore.configureAdapter(adapter);
  await web3authCore.init();
  await web3authCore.connectTo(adapter.name, {
    loginProvider: 'jwt',
    extraLoginOptions: {
      domain: 'https://dev-3a3ecbqhdt00k46g.us.auth0.com',
      verifierIdField: 'sub',
    },
  });
  const user = await web3authCore.getUserInfo();
  console.log(user);
};