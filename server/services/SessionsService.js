import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SessionsService {
  async create(rawData) {
    let data = await dbContext.Session.create(rawData)
  }
  async addToQueue(sessionCode, song) {

    let data = await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode, },
      { $addToSet: { queue: song } },
      { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async getById(sessionCode) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }
}

export const sessionsService = new SessionsService();