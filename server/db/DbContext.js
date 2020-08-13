import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import SearchSchema from "../models/Search";
import HostTokensSchema from "../models/HostTokens";
import SongSchema from "../models/Song";
import SessionSchema from "../models/Session"


class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Search = mongoose.model("Search", SearchSchema);
  Song = mongoose.model("Song", SongSchema)
  Session = mongoose.model("Session", SessionSchema)

  HostTokens = mongoose.model("HostTokens", HostTokensSchema)

}

export const dbContext = new DbContext();
