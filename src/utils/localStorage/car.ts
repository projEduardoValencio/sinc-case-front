import { IClientResponse } from "@/interface/IClient";
import { clientKey } from "./keys";

export const setSelectedClient = (client: IClientResponse): boolean => {
  try {
    localStorage.setItem(clientKey, JSON.stringify(client));
    return true;
  } catch (error) {
    console.log("Error setting selected Client", error);
    return false;
  }
};

export const getSelectedClient = (): IClientResponse => {
  try {
    return JSON.parse(localStorage.getItem(clientKey) || "") as IClientResponse;
  } catch (error) {
    console.log("Error getting selected Client", error);
    throw new Error("Error getting selected Client");
  }
};

export const clearSelectedClient = () => {
  localStorage.removeItem(clientKey);
};
