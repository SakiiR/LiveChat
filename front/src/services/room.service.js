import axios from "axios";
import store from "../redux/store";

class RoomService {
  baseURL = "";

  authToken = "";

  constructor() {
    this.baseURL = "/api/room";
    this.getToken();
  }

  async getToken() {
    this.authToken = store.getState().generalReducer.jwt;
    return this.authToken;
  }

  async create(room) {
    await this.getToken();
    const response = await axios.post(
      `${this.baseURL}`,
      {
        password: room.roomPassword,
        private: room.roomPrivate,
        name: room.roomName,
        description:
          room.roomDescription.length > 0 ? room.roomDescription : null
      },
      { headers: { Authorization: this.authToken } }
    );
    return response.data;
  }

  async list() {
    await this.getToken();
    const response = await axios.get(`${this.baseURL}`, {
      headers: { Authorization: this.authToken }
    });
    return response;
  }

  async remove(room, password) {
    await this.getToken();
    const response = await axios.delete(
      `${this.baseURL}/${room._id}${
        room.private ? `?password=${password}` : ""
      }`,
      {
        headers: { Authorization: this.authToken }
      }
    );
    return response;
  }
}

const instance = new RoomService();

export default instance;
