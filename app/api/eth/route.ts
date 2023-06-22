import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

interface ICryptoQuote {
  price: number;
  // Add other properties as needed
}

interface ICryptoData {
  quote: {
    ETH: ICryptoQuote;
  };
  // Add other properties as needed
}

interface ICryptoListingResponse {
  data: {
    data: ICryptoData;
    quote: {
      ETH: ICryptoQuote;
    };
  };
  // Add other properties as needed
}

export async function GET() {
  const response: AxiosResponse<ICryptoListingResponse> = await axios.get(
    "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
    {
      headers: {
        "X-CMC_PRO_API_KEY": "12e68d9f-5d5c-4ee1-bc5f-af59ac60787d",
      },
      params: {
        id: "14960", // this is the id of Ethereum (ETH) on CoinMarketCap
        amount: "1", // amount of ETH you want to convert
        convert: "ETH", // the symbol of the cryptocurrency you want to convert to
      },
    }
  );

  if (!response?.data) {
    return NextResponse.json({
      status: 500,
      error: true,
    });
  }

  const data = response.data.data.quote.ETH.price;
  return NextResponse.json(data);
}
