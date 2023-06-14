import { clearSelectedCar } from "./car";
import { clearSelectedClientStorage } from "./client";
import { clearSelectedDatePeriod } from "./date";

export const datePeriodKey = "select-period-date";
export const clientKey = "selected-client";
export const carKey = "selected-car";

export const clearAllStorageRental = () => {
  console.log("Clear");
  clearSelectedClientStorage();
  clearSelectedCar();
  clearSelectedDatePeriod();
};
