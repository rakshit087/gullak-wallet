import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";


const PK = process.env.PUSH_CHANNEL_PRIVATE_KEY; // channel private key
const Pkey = `0x${process.env.PK}`;
const signer = new ethers.Wallet(Pkey);

export const sendNotification = async(goal) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3,
      identityType: 2, // direct payload
      notification: {
        title: `You have joined the goal ${goal.name}`,
        body: `Let us accomplish this together`
      },
      recipients: goal.addresses,
      channel: '0x88EF51355B34f7Bb4874a731916841702cAeF2C7', // your channel address
      env: 'staging'
    });
    console.log('API repsonse: ', apiResponse);
    if(apiResponse?.status === 204) {
        console.log("Notifications dispatched!");
    }
  } catch (err) {
    console.error('Error admist sharing notification: ', err);
  }
}
