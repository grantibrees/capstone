import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AuthHostService {
  async setHostTokens(payload) {
    try { let HostTokens = await dbContext.HostTokens.create(payload);
    return HostTokens;
    } catch (error){
      console.error(error)
    }
  }
  async findById(id) {
    let value = await dbContext.Search.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
}

export const authHostService = new AuthHostService();