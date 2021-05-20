// import React, { useState, useEffect } from 'react';
// import {List, Avatar, Statistic, Row, Col, Button } from 'antd';
// import { EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

// import Big from 'big.js';

// const Balances = (props) => {
//     // useEffect(() => {
//     // }, [props.balance]);

// return (
//     <>
//         {props.balance && 
//               <List.Item
//         //   actions={[
//         //     <Button type="secondary" shape="circle" onClick={() => {props.editBalance(props.balance, true);}}>
//         //     <EditOutlined />
//         //   </Button>,
//         //   <Button type="secondary" shape="circle" onClick={() => {props.deleteBalance(props.balance);}}>
//         //     <DeleteOutlined />
//         //   </Button>,
//         // ]}
//         >
//           {/* {prices && console.log(prices.filter(p => p.id === item.token_id)[0])} */}
//           {/* {console.log(props.asset_info)} */}
//             <List.Item.Meta
//             // title={<a href={`https://www.coingecko.com/en/coins/${props.balance.token_id}`}>{props.balance.asset}</a>}
//             description={props.balance}
//             />

//             {/* <AssetInfo asset_info={prices ? prices.filter(p => p.id === item.token_id)[0]: null} quantity={item.quantity}/> */}

//         </List.Item>
//         }
//         </>
//   );
// }
import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BalanceTable = ({balances, toDelete}) => {

const columns = [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
   <Button type="secondary" shape="circle" >
     <EditOutlined />
   </Button>
   <Button type="secondary" shape="circle" onClick={() => {toDelete(record)}}>
     <DeleteOutlined />
   </Button>
      </Space>
    ),
  },
];


return (
  <Table columns={columns} dataSource={balances} pagination={false} showHeader={false} size={'small'} rowKey={'id'}/>

);
}
export default BalanceTable;