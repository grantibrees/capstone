import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Search = new Schema(
  {
    search: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Search;