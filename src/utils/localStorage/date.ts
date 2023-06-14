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

export const getSelectedDatePeriod = (): IDatePeriod | undefined => {
  try {
    return JSON.parse(localStorage.getItem(datePeriodKey) || "") as
      | IDatePeriod
      | undefined;
  } catch (error) {
    return undefined;
  }
};

export const clearSelectedDatePeriod = () => {
  localStorage.removeItem(datePeriodKey);
};
