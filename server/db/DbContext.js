import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import SearchSchema from "../models/Search"


class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Search = mongoose.model("Search", SearchSchema)

}

export const dbContext = new DbContext();
