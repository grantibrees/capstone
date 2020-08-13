import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HostTokens = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: String, required: true },

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default HostTokens;