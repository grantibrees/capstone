import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import SearchSchema from "../models/Search";
import HostTokensSchema from "../models/HostTokens";


class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Search = mongoose.model("Search", SearchSchema);

  HostTokens = mongoose.model("HostTokens", HostTokensSchema)

}

export const dbContext = new DbContext();
