import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import __BaseDAO__ from "../../backend/DAO/__BaseDao__";
import MerkleClaim from "../../backend/models/merkleClaimModel";
import Mongoose from "mongoose";
import { MONGOO_URL } from "../../utils/constant";

const uri = MONGOO_URL;
// export const runtime = 'edge'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  Mongoose.connect(uri)
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));

  const addressToFind = req.body.address;
  const document = await __BaseDAO__.__search__(MerkleClaim, {
    address: addressToFind,
  });

  if (!document || document.length === 0) {
    return res
      .status(404)
      .send({ error: "No claim found for the provided address" });
  }

  res.json(document);
};

export default handler;
