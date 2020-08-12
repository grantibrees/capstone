import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SearchService {
  async find(query={}) {
    let values = await dbContext.Search.find(query);
    return values;
  }
  async findById(id) {
    let value = await dbContext.Search.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
}

export const searchService = new SearchService();