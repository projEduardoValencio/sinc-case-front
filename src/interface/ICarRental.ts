import { ICarResponse } from "./ICar";
import { IClientResponse } from "./IClient";

export interface ICarRental {
  client_id: number;
  car_id: number;
  start_date: Date;
  end_date: Date;
}

export interface ICarRentalResponse {
  id: number;
  client: IClientResponse;
  car: ICarResponse;
  startDate: Date;
  endDate: Date;
}
