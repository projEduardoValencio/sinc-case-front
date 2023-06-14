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

export const getSelectedCar = (): ICarResponse | undefined => {
  try {
    return JSON.parse(localStorage.getItem(carKey) || "") as
      | ICarResponse
      | undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const clearSelectedCar = () => {
  localStorage.removeItem(carKey);
};
