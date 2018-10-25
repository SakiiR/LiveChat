import axios from "axios";

class AuthService {
  baseURL = "";

  constructor() {
    this.baseURL = "";
  }

  async login(user) {
    const response = await axios.post(`${this.baseURL}/auth/login`, {
      username: user.username,
      password: user.password
    });
    return response.data;
  }

  async register(user) {
    const response = await axios.post(`${this.baseURL}/auth/register`, {
      username: user.username,
      password: user.password
    });
    return response.data;
  }
}

const instance = new AuthService();

export default instance;
