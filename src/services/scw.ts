import { Sdk, randomPrivateKey, NetworkNames, EnvNames } from 'etherspot';

export class SCW {
  sdk: Sdk;

  constructor(privateKey: string) {
    this.sdk = new Sdk(privateKey, {
      env: EnvNames.TestNets,
      networkName: NetworkNames.Mumbai,
    });
  }
}
