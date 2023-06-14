import { carKey, datePeriodKey } from "./keys";

export interface IDatePeriod {
  startDate: Date;
  endDate: Date;
}

export const setSelectedDatePeriod = (datePeriod: IDatePeriod) => {
  try {
    localStorage.setItem(datePeriodKey, JSON.stringify(datePeriod));
  } catch (error) {
    console.log("Error setting selected Date Period", error);
    throw new Error("Error setting selected Date Period");
  }
};

export const getSelectedDatePeriod = (): IDatePeriod => {
  try {
    return JSON.parse(localStorage.getItem(datePeriodKey) || "") as IDatePeriod;
  } catch (error) {
    console.log("Error getting selected Date Period", error);
    throw new Error("Error getting selected Date Period");
  }
};

export const clearSelectedDatePeriod = () => {
  localStorage.removeItem(carKey);
};
