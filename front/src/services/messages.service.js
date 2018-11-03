import axios from "axios";
import store from "../redux/store";

class MessageService {
  baseURL = "/api";

  authToken = "";

  constructor() {
    this.baseURL = "/api";
    this.getToken();
  }

  async getToken() {
    this.authToken = store.getState().generalReducer.jwt;
    return this.authToken;
  }

  async list(room, password) {
    await this.getToken();
    const result = await axios.get(
      `${this.baseURL}/room/${room._id}/messages${
        room.private ? `?password=${password}` : ""
      }`,
      { headers: { Authorization: this.authToken } }
    );
    return result;
  }

  async create(room, password, message) {
    await this.getToken();
    const result = await axios.post(
      `${this.baseURL}/room/${room._id}/message${
        password != null ? `?password=${password}` : ""
      }`,
      message,
      { headers: { Authorization: this.authToken } }
    );
    return result;
  }

  async remove(message) {
    await this.getToken();
    const result = await axios.delete(
      `${this.baseURL}/message/${message._id}`,
      { headers: { Authorization: this.authToken } }
    );
    return result;
  }
}

const instance = new MessageService();

export default instance;
