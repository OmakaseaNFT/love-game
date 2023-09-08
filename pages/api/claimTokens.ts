import { NextApiRequest, NextApiResponse } from "next";
import { utils } from 'ethers';
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { createClient } from '@vercel/kv';

import { KV_REST_API_URL, KV_REST_API_TOKEN } from '../../utils/constant';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    message,
    signature
  } = req.body;

  const kvClient = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN
  });

  const owner = utils.getAddress(
    recoverPersonalSignature({ data: message, signature})
  );

  const sigObj = await kvClient.get(owner)
    .catch(() => null);

  return res.json(sigObj);
};

export default handler;
