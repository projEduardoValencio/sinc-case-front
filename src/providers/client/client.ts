import { IClient, IClientResponse } from "@/interface/IClient";
import api from "../api";

class Client {
  route: string = "/client";

  async list(): Promise<IClientResponse[]> {
    try {
      const response = await api.get(this.route + "/all");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByCPF(cpf: string) {
    try {
      const response = await api.get(`${this.route}?search=${cpf}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(client: IClient) {
    try {
      const response = await api.post(this.route, client);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, newClient: IClient) {
    try {
      const response = await api.put(`${this.route}?id=${id}`, newClient);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const response = await api.delete(`${this.route}?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const client = new Client();
export default client;
