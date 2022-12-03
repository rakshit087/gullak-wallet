export function createGoal(name: string, addresses: Array<string>): any {
  // name: addresses of created safe
  // save the userPrivate/public id: name: address
  return {id: {name, addresses}};
}

export function listGoals() {
  // call gnosis to fetch all safes/groups the accounts the main wallet is involved with
  // TODO: look at how
  return
}
