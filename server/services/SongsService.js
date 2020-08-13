import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SongService {
  async find(query = {}) {
    let values = await dbContext.Song.find(query);
    return values;
  }
  async findById(id) {
    let value = await dbContext.Song.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
}

export const songService = new SongService();