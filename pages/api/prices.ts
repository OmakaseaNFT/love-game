import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const COINMARKETCAP_API_KEY = "12e68d9f-5d5c-4ee1-bc5f-af59ac60787d"

async function getBtcToUsdPrice() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
      {
        headers: {
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
        },
        params: {
          amount: 1,
          symbol: "BTC",
          convert: "USDT",
        },
      }
    );
    console.log("response", response.data.data[0].quote["USDT"].price);

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
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
        },
        params: {
          amount: 1,
          symbol: "PEPE",
          convert: "USDT",
        },
      }
    );
    console.log("response", response.data.data[0].quote["USDT"].price);

    return response.data.data[0].quote["USDT"].price;
  } catch (error) {
    console.log("error", error);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;
  try {
    let price;
    if (token === "PEPE") {
      price = await getPepeToUsdPrice();
      res.status(200).json({ price });
    } else {
      price = await getBtcToUsdPrice();
    }
    res.status(200).json({ price });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
