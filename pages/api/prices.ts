import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import TokenPrice from "../../backend/models/TokenPrice.js";
import Mongoose from "mongoose";
import { MONGOO_URL } from "../../utils/constant";

async function getBtcToUsdPrice() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
        },
        params: {
          amount: 1,
          symbol: "BTC",
          convert: "USDT",
        },
      }
    );
    return response.data.data[0].quote["USDT"].price;
  } catch (error) {
    console.log("error", error);
  }
}

async function getPepeToUsdPrice() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
        },
        params: {
          amount: 1,
          symbol: "PEPE",
          convert: "USDT",
        },
      }
    );
    return response.data.data[0].quote["USDT"].price;
  } catch (error) {
    console.log("error", error);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  Mongoose.connect(MONGOO_URL)
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));

  const { token } = req.query;

  if (token === "PEPE") {
    try {
      const price = await TokenPrice.findOne({ symbol: "PEPE" });
      if (!price) {
        const pepeInUsd = await getPepeToUsdPrice();
        const currentTimestamp = Date.now();
        const newPrice = new TokenPrice({
          symbol: "PEPE",
          price: pepeInUsd,
          created_at: currentTimestamp,
        });
        newPrice.save();
        res.status(200).json({ price: pepeInUsd });
      } else if (price) {
        const currentTimestamp = Date.now();
        const fiveMinutesInMilliseconds = 5 * 60 * 1000;
        const savedTimestamp = price.created_at; // Get the timestamp saved in the database

        if (currentTimestamp > savedTimestamp + fiveMinutesInMilliseconds) {
          // 5 minutes have elapsed
          const pepeInUsd = await getPepeToUsdPrice();
          await TokenPrice.findOneAndUpdate({
            symbol: "PEPE",
            price: pepeInUsd,
            created_at: Date.now(),
          });
          res.status(200).json({ price: pepeInUsd });
        } else {
          // 5 minutes have not elapsed yet
          const pepeInUsd = price.price;
          res.json({ price: pepeInUsd });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

export default handler;
