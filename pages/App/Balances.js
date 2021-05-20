import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Avatar , Button} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AssetGroup from './AssetGroup';

const Balances = ({summary, prices, toDelete, addBalance, deleteAsset}) => {
      
  useEffect(() => {
  }, [summary, prices]);

  return (
    <div>
        <List
        rowKey={'id'}
        style={{width:"100%"}}
        size={"small"}
        itemLayout="horizontal"
        dataSource={summary}
        renderItem={item => (
          <>
          <AssetGroup
          addBalance={addBalance}
          asset={item}
          prices={prices}
          key={item.asset}
          toDelete={toDelete}
          deleteAsset={deleteAsset}
          />
          </>
    )}
  />
    </div>
  );
}
export default Balances;