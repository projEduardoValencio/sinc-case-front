import { IClient } from "@/interface/IClient";
import api from "../api";

class Client {
  route: string = "/client";
  async create(client: IClient) {
    try {
      await api.post(this.route, client);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const client = new Client();
export default client;
