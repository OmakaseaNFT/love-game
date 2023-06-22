import { NextResponse } from "next/server";
import Mongoose from "mongoose";
import __BaseDAO__ from "@/system/backend/__BaseDao__";
import MerkleClaim from "@/system/backend/merkleClaimModel";
import { MONGOO_URL } from "@/utils/constant";

const uri = MONGOO_URL;

export async function GET(req: Request) {
  const body = await req.json();

  Mongoose.connect(uri)
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));

  const addressToFind = body.address;
  const document = await __BaseDAO__.__search__(MerkleClaim, {
    address: addressToFind,
  });

  if (!document || document.length === 0) {
    return NextResponse.json({
      status: 404,
      error: true,
      message: "No claim found for the provided address",
    });
  }

  return NextResponse.json(document);
}
