import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from "next";
import { utils } from 'ethers';
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    message,
    signature
  } = req.body;

  const owner = utils.getAddress(
    recoverPersonalSignature({ data: message, signature})
  );

  const sigObj = await kv.get(owner)
    .catch(() => null);

  return res.json(sigObj);
};

export default handler;
