export interface ICountryData {
  abbreviation: string;
  capital_city: string;
  confirmed: number;
  continent: string;
  country: string;
  deaths: number;
  elevation_in_meters?: any;
  iso: number;
  lat: string;
  life_expectancy: string;
  location: string;
  long: string;
  population: number;
  recovered: number;
  sq_km_area: number;
  updated: string;
}

export interface IOverallData {
  id: number;
  country: string;
  data: ICountryData;
}
