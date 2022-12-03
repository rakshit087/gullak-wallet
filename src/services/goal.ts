import {
  createAndDeploySafe,
  getContractNetworks,
} from "./safe";

export async function createGoal(name: string, addresses: Array<string>): any {
  const invoker = null; // TODO: decide if the invoker is stored in window
  const contractNetworks = await getContractNetworks(invoker);
  const deployedSafe = await createAndDeploySafe(invoker,addresses,contractNetworks);
  // TODO: see if id deployed safe returns something that can be taken as id
  console.log("this is deployed safe: ", {deployedSafe});
  const id = deployedSafe.id | 1;
  // name: addresses of created safe
  // save the userPrivate/public id: name: address
  const goal:any = {};
  goal[id] = {name, addresses};
  return goal;
}

export function listGoals() {
  // call gnosis to fetch all safes/groups the accounts the main wallet is involved with
  // TODO: look at how
  return
}
