import { IClientResponse } from "@/interface/IClient";
import { clientKey } from "./keys";

export const setSelectedClientStorage = (client: IClientResponse) => {
  try {
    localStorage.setItem(clientKey, JSON.stringify(client));
  } catch (error) {
    console.log("Error setting selected Client", error);
    throw new Error("Error setting selected Client");
  }
};

export const getSelectedClientStorage = (): IClientResponse | undefined => {
  try {
    const resp = JSON.parse(localStorage.getItem(clientKey) || "") as
      | IClientResponse
      | undefined;
    return resp;
  } catch (error) {
    return undefined;
  }
};

export const clearSelectedClientStorage = () => {
  localStorage.removeItem(clientKey);
};
