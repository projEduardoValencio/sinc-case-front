import { ICar } from "@/interface/ICar";
import api from "../api";

class Car {
  route: string = "/car";

  async list() {
    try {
      const response = await api.get(this.route + "/all");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByPlate(plate: string) {
    try {
      const response = await api.get(this.route + `?search=${plate}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(car: ICar) {
    try {
      const response = await api.post(this.route, car);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, car: ICar) {
    try {
      const response = await api.put(this.route + `?id=${id}`, car);
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

const car = new Car();
export default car;
