import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AuthHostService {
  async setHostTokens(access_token, refresh_token, expires_in) {
    let HostTokens = await dbContext.HostTokens.create(access_token, refresh_token, expires_in);
    return HostTokens;
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