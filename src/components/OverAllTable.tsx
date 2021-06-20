import React, { useEffect, useState } from 'react';
import { getCases } from '../apis/api';
import { IOverallData } from '../models/OverAllData';
import { handleRawResponse, maskComma } from './helpers';
import { CBadge, CCardBody, CDataTable } from '@coreui/react';
// import CIcon from '@coreui/icons-react';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.';

const OverAllTable = () => {
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
    { key: 'confirmed', _style: { width: '15%' }, label: 'Số ca nhiễm', filter: false },
    { key: 'deaths', _style: { width: '15%' }, label: 'Số ca tử vong', filter: false },
    { key: 'recovered', _style: { width: '15%' }, label: 'Số ca hồi phục', filter: false },
    { key: 'population', _style: { width: '15%' }, label: 'Dân số', filter: false },
    { key: 'updated', _style: { width: '15%' }, label: 'Cập nhật lúc', filter: false },

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
      <CDataTable
        items={data}
        fields={fields}
        columnFilter
        tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
        cleaner
        itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
        itemsPerPage={25}
        hover
        sorter
        pagination
        scopedSlots={{
          population: (item: IOverallData) => (
            <td>{item.data.population ? maskComma(item.data.population) : 'Chưa xác định'}</td>
          ),
          recovered: (item: IOverallData) => (
            <td>
              <CBadge color="success">
                {item.data.recovered ? maskComma(item.data.recovered) : 'Chưa xác định'}
              </CBadge>
            </td>
          ),
          updated: (item: IOverallData) => (
            <td>{item.data.updated ? new Date(item.data.updated).toLocaleString() : 'Chưa xác định'}</td>
          ),
          deaths: (item: IOverallData) => (
            <td>
              <CBadge color="danger">
                {item.data.deaths ? maskComma(item.data.deaths) : 'Chưa xác định'}
              </CBadge>
            </td>
          ),
          confirmed: (item: IOverallData) => (
            <td>
              <CBadge color="info">
                {item.data.confirmed ? maskComma(item.data.confirmed) : 'Chưa xác định'}
              </CBadge>
            </td>
          ),
          //   show_details: (item: IOverallData) => {
          //     return (
          //       <td className="py-2">
          //         <CButton
          //           color="primary"
          //           variant="outline"
          //           shape="square"
          //           size="sm"
          //           onClick={() => {
          //             toggleDetails(item.id);
          //           }}
          //         >
          //           {details.includes(item.id) ? 'Chi tiết' : 'Ẩn'}
          //         </CButton>
          //       </td>
          //     );
          //   },
          //   details: (item: IOverallData) => {
          //     return (
          //       <CCollapse>
          //         <CCardBody>
          //           <h4>{item.country}</h4>
          //           <p className="text-muted">User since: {item.data.iso}</p>
          //           <CButton size="sm" color="info">
          //             User Settings
          //           </CButton>
          //           <CButton size="sm" color="danger" className="ml-1">
          //             Delete
          //           </CButton>
          //         </CCardBody>
          //       </CCollapse>
          //     );
          //   },
        }}
      />
    </CCardBody>
  );
};

export default OverAllTable;
