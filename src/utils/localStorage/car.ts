import { carKey } from "./keys";
import { ICarResponse } from "@/interface/ICar";

export const setSelectedCar = (car: ICarResponse) => {
  try {
    localStorage.setItem(carKey, JSON.stringify(car));
  } catch (error) {
    console.log("Error setting selected Car", error);
    throw new Error("Error setting selected Car");
  }
};

export const getSelectedCar = (): ICarResponse => {
  try {
    return JSON.parse(localStorage.getItem(carKey) || "") as ICarResponse;
  } catch (error) {
    console.log("Error getting selected Car", error);
    throw new Error("Error getting selected Car");
  }
};

export const clearSelectedCar = () => {
  localStorage.removeItem(carKey);
};
