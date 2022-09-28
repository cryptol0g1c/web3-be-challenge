import mongoose from "mongoose";

const abiSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Abi", abiSchema);
