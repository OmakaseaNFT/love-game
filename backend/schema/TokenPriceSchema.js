export default {
  symbol: { type: String },
  price: { type: Number },
  created_at: { type: Number, required: true, default: Date.now },
};
