import mongoose from "mongoose";
import TokenPriceSchema from "../schema/TokenPriceSchema";

const schema = new mongoose.Schema(TokenPriceSchema);
export default mongoose.models['TokenPrice'] || mongoose.model("TokenPrice", schema);