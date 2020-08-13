import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Session = new Schema(
  {
    userEmail: { type: String, required: true },
    sessionName: { type: String, required: true },
    sessionCode: { type: Number, required: true },
    queue: [],

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Session;