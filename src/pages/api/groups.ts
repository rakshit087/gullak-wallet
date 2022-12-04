// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json([
    {
      name: 'Goa Trip',
      owners: [
        { name: 'Rupali', address: '0x3E17Ec4eb30F4A1F0be42B302D1e0BCfa03ae37E' },
        {name:"You", address:"0x23CEd055fFd70897B3CaaF13Cb717a0222E073cA"},
        {name:"Abhishek", address:"0xe4D9048Fda61b814D95Cb2846C4Ba05e0a608242"},
      ],
      amount: "130",
      transfers: [
        {
          by:"Rupali",
          amount: "40",
        },
        {
          by:"Rupali",
          amount: "10",
        },
        {
          by:"Abhishek",
          amount: "80",
        }
      ]
    },
    {
      name: 'Moms Birthday :)',
      owners: [
        { name: 'Mansi', address: '0x3E17Ec2eb30F4A1F0be42B302D1e0BCfa03ae37E' },
        {name:"You", address:"0x23CEd055fFd70897B3CaaF13Cb717a0222E073cA"},
      ],
      amount: "70",
      transfers: [
        {
          by:"Mansi",
          amount: "40",
        },
        {
          by:"You",
          amount: "30",
        },
      ]
    },
  ]);
}
