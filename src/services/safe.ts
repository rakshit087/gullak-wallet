import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/safe-core-sdk'
import ethers from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";

/*
Create safe basically creates a multisig with the given addresses
v1:
args:
invoker ( ethAdapter ): the person who is creating the safe
owners: list of members of the multisig
contractNetworks: { chainId: { smart contracts the safe will interact with } }
returns:
object of deployed safe
we can call deployedSafe.*(getAddress, getBalance, createTransaction, ...)
*/
export async function createAndDeploySafe(invoker: any, owners: any, contractNetworks: any) {
  console.log(`${JSON.stringify(invoker, null, 2)} is creating a safe with owners: ${JSON.stringify(owners, null, 2)} on contractNetworks: ${JSON.stringify(contractNetworks, null, 2)}`);
  // create the safe factory
  const safeFactory = await SafeFactory.create({
    ethAdapter: invoker,
    contractNetworks: contractNetworks,
  });

  // create a safe using safe factory
  // addresses of the members of the safe
  // minimum amount of signatures required to approve transactions for this safe
  const threshold = owners.length;
  const safeAccountConfig = {
    owners,
    // TODO (Remove): Hardcoding to 2 for testing purpose
    threshold,
  };
  // deploy a safe
  return await safeFactory.deploySafe({safeAccountConfig});
}

export async function getContractNetworks(invoker: any) {
  // get chain id
  const id = await invoker.getChainId();
  const contractNetworks = {
    [id]: {
      // 3 smart contracts with which the safe will interact
      multiSendAddress: process.env.MULTI_SEND_ADDRESS,
      safeMasterCopyAddress: process.env.SAFE_MASTER_COPY_ADDRESS,
      safeProxyFactoryAddress: process.env.SAFE_PROXY_FACTORY_ADDRESS,
    }
  }

  return contractNetworks;
}

/*
returns:
safeSdk for the invoker
*/
export async function getSafeSdk(invokerAdapter, deployedSafeAddress, contractNetworks) {
  return await Safe.create({
    ethAdapter: invokerAdapter,
    safeAddress: deployedSafeAddress,
    contractNetworks: contractNetworks,
  });
}

function generateTransaction(to, opts) {
  // This is to transfer some money to an account
  // TODO: Modify to include transaction wrt a contract
  return {
    to,
    // contract parameters
    data: opts.data,
    value: opts.value,
  };
}

export function getJsonRpcProvider() {
  return new ethers.providers.JsonRpcProvider();
}

export function getAdapter(account: any) {
  const signer = getJsonRpcProvider().getSigner(account);
  return new EthersAdapter({ ethers, signerOrProvider: signer })
}

export async function getSafeSdk(account: any, safeAddress: any) {
  return await Safe.connect(
    {
      ethAdapter: getAdapter(account),
      safeAddress: safeAddress,
    }
  );
}


export async function main() {
  const accounts = [
    process.env.ACCOUNT_1,
    process.env.ACCOUNT_2,
    process.env.ACCOUNT_7,
  ];

  /*
  const ceo = process.env.ACCOUNT_1;
  const cto = process.env.ACCOUNT_2;
  const meme_artist = process.env.ACCOUNT_3;
  const solidity_engineer = process.env.ACCOUNT_4;
  const advisor = process.env.ACCOUNT_5;
  const investor = process.env.ACCOUNT_6;
  const yacht_shop = process.env.ACCOUNT_7;
  */

  // The Gnosis safe contract works with the ethers.js library
  // so we need an adapter that works with ether.js
  // We need an adapter for every signer
  const adapters = accounts.map(account => getAdapter(account));
  // shared with everyone who wants to get the Safe object
  // TODO: see if adapters or accounts should have a better structure
  const contractNetworks = await getContractNetworks(adapters[0]);
  const safeSdk_ceo = await createAndDeploySafe(
    adapters[0],
    accounts,
    contractNetworks,
  );

  const treasury = safeSdk_ceo.getAddress();

  const ten_ethers = ethers.utils.parseUnits("10", "ether").toHexString();
  const trx_params = [{
    from: investor,
    to: treasury,
    value: ten_ethers,
  }];
  // Investor sends money to the created safe / treasury using `eth_sendTransaction` RPC method
  await provider.send("eth_sendTransaction", trx_params);
  console.log("Fundraising.");

  // check balance of the safe
  const balance = await safeSdk_ceo.getBalance();
  console.log(`Initial balance of the treasury: ${ethers.utils.formatUnits(balance, "ether")} ETH`);
  const three_ethers = ethers.utils.parseUnits("3", "ether").toHexString();
  const transaction = generateTransaction(
    yacht_shop,
    {
      // replace this with contract parameters
      data: "0x",
      value: three_ethers,
    }
  );

  // create a transaction
  const safeTransaction = await safeSdk_ceo.createTransaction(transaction);
  // get hash of the created transaction
  const hash = await safeSdk_ceo.getTransactionHash(safeTransaction);
  // approve the hash of the created transactions
  const txResponse = await safeSdk_ceo.approveTransactionHash(hash);
  await txResponse.transactionResponse?.wait();

  const hashCTO = await safeSdk_ceo.getTransactionHash(safeTransaction);

  const safeSdk_cto = await getSafeSdk(ethAdapter_cto, treasury, contractNetworks);

  const safeTransactionCTO = await safeSdk_cto.createTransaction(transaction);
  const txResponse_cto = await safeSdk_cto.executeTransaction(safeTransactionCTO);
  await txResponse_cto.transactionResponse?.wait();

  console.log("Buying a yacht.");

  const afterBalance = await safeSdk_ceo.getBalance();
  console.log(`The final balance of the treasury: ${ethers.utils.formatUnits(afterBalance, "ether")} ETH`);
}