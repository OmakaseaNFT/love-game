const mongoose = require("mongoose");
const merkleClaimSchema = require("../schema/merkleClaimSchema");

const schema = new mongoose.Schema(merkleClaimSchema);
const MerkleClaim = mongoose.model("MerkleClaim", schema);

module.exports = MerkleClaim;