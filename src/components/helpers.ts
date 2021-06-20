import { IOverallData } from '../models/OverAllData';

export const handleRawResponse = (res: any): IOverallData[] => {
  const output: IOverallData[] = Object.keys(res).map((country, i) => ({
    id: i,
    country: country,
    data: res[country].All,
  }));
  return output;
};

export const maskComma = (input: number | undefined) => {
  if (input) {
    return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '';
  }
};
