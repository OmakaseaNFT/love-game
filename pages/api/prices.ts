import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
  const { token } = req.query;

  if (token === "PEPE") {
    try {
      const pepeInUsd = await getPepeToUsdPrice();
      res.status(200).json({ price: pepeInUsd });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

export default handler;
