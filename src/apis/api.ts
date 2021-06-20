import axios from '../config/axios-interceptor';

export const getCases = async () => {
  try {
    const result = await axios.get(`cases`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export enum Continent {
  EUROPE = 'Europe',
  ASIA = 'Asia',
  AFRICA = 'Africa',
}
export enum Status {
  DEATH = 'deaths',
  CONFIRMED = 'confirmed',
  RECOVERED = 'recovered',
}
export const continentArray: Continent[] = [Continent.EUROPE, Continent.AFRICA, Continent.ASIA];
export const statusArray: Status[] = [Status.DEATH, Status.CONFIRMED, Status.RECOVERED];

export interface IHistoricalDataParams {
  continent: Continent;
  status: Status;
}
export const getHistoricalData = async (params: IHistoricalDataParams) => {
  try {
    const result = await axios.get(`history`, { params });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
