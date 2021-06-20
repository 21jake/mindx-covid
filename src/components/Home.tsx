import React, { useEffect, useState } from 'react';
import { getCases } from '../apis/api';
import { IOverallData } from '../models/OverAllData';
import { handleRawResponse } from './helpers';
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import OverAllTable from './OverAllTable';
import HistoricalData from './HistoricalData';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.';

const Home = () => {
  const [data, setData] = useState<IOverallData[]>([]);

  useEffect(() => {
    getCases().then((res) => setData(handleRawResponse(res)));
  }, []);

  const [details, setDetails] = useState<number[]>([]);
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index: number) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: 'country', _style: { width: '20%' }, label: 'Quốc gia' },
    { key: 'population', _style: { width: '15%' }, label: 'Dân số' },
    { key: 'confirmed', _style: { width: '15%' }, label: 'Số ca nhiễm' },
    { key: 'deaths', _style: { width: '15%' }, label: 'Số ca tử vong' },
    { key: 'recovered', _style: { width: '15%' }, label: 'Số ca hồi phục' },
    { key: 'updated', _style: { width: '15%' }, label: 'Cập nhật lúc' },

    // {
    //   key: 'show_details',
    //   label: '',
    //   _style: { width: '1%' },
    //   filter: false,
    // },
  ];

  const getBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const [active, setActive] = useState(1);

  return (
    <CCardBody>
      <CTabs activeTab={active} onActiveTabChange={(idx: any) => setActive(idx)}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>Overall Data</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>Historical Data</CNavLink>
          </CNavItem>
          <CNavItem></CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            <OverAllTable />
          </CTabPane>
          <CTabPane>
            <HistoricalData />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CCardBody>
  );
};

export default Home;
