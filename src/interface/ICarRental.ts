export interface ICarRental {
  client_id: number;
  car_id: number;
  start_date: Date;
  end_date: Date;
}

export interface ICarRentalResponse {
  client_id: number;
  car_id: number;
  start_date: Date;
  end_date: Date;
}