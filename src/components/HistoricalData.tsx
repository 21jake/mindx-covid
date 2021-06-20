import React, { useEffect, useState } from 'react';
import { Continent, continentArray, getCases, getHistoricalData, Status } from '../apis/api';
import { IOverallData } from '../models/OverAllData';
import { CCardBody, CDataTable } from '@coreui/react';
import { handleRawResponse } from './helpers';
import { sum } from 'lodash';
// import CIcon from '@coreui/icons-react';

// handleRawResponse

export interface IContinentData {
  id: number;
  continent: Continent;
  data: IOverallData[];
  total: number;
}

const mapDate = (date: any) => {
  const tmp = Object.values(date).map((e) => e);
  return tmp.slice(0, 7);
};

const calculateHistoricalDataInLast7Days = (data: any) => {
  let total = 0;
  Object.values(data).map((e: any) => (total += sum(mapDate(e.All.dates))));
  return total;
};

const handleHistoricalResponse = (res: any): IContinentData[] => {
  console.log(res, 'res');
  const output = Object.keys(res).map((e, i) => ({
    id: i,
    continent: continentArray[i],
    data: handleRawResponse(res[e]),
    total: calculateHistoricalDataInLast7Days(res[e]),
  }));
  return output;
};

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState<IContinentData[]>([]);

  const fetchHistoricalData = () => {
    Promise.all(continentArray.map((e) => getHistoricalData({ continent: e, status: Status.DEATH }))).then(
      (res) => setHistoricalData(handleHistoricalResponse(res))
    );
  };
  useEffect(() => {
    fetchHistoricalData();
  }, []);

  console.log(historicalData, 'historicalData');

  return <div>setHistoricalData</div>;
};

export default HistoricalData;
