export interface ICar {
  plate: string;
  model: string;
  brand: string;
  current_km: number;
  vehicle_year: Date;
}

export interface ICarResponse {
  id: number;
  plate: string;
  model: string;
  brand: string;
  current_km: number;
  vehicle_year: Date;
}
