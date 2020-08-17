import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AuthHostService {
  async setHostTokens(email, accessToken, refreshToken) {
    try {
      await dbContext.Profile.findOneAndUpdate(
        { email: email },
        { $addToSet: { currentAccessToken: accessToken } },
        // { $addToSet: {currentRefreshToken: refreshToken}}, Have to add this later
        { new: true }
      )

    } catch (error) {
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