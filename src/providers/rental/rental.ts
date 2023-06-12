import { ICarRental } from "@/interface/ICarRental";
import api from "../api";

class Rental {
  route: string = "/rental";

  async listAll() {
    try {
      const response = await api.get(this.route + "/all");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async listCurrent() {
    try {
      const response = await api.get(this.route + "/current");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async listFinished() {
    try {
      const response = await api.get(this.route + "/finished");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByID(id: number) {
    try {
      const response = await api.get(this.route + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(rental: ICarRental) {
    try {
      const response = await api.post(this.route, rental);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, rental: ICarRental) {
    try {
      const response = await api.put(this.route + `?id=${id}`, rental);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const response = await api.delete(this.route + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const rental = new Rental();
export default rental;
