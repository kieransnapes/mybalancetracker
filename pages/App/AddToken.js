import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Modal, Button, Avatar, Typography } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { useForm } from 'antd/lib/form/Form';
import CoinSearch from './CoinSearch';

const _ = require('lodash');
const AddTokenModal = ({ visible, onCreate, onCancel, tokens}) => {
  
  // useEffect(() => {
  // }, [balance]);
  
  const [form2] = Form.useForm();
  // let old_values = balance
  // let edit = false

  // if(_.isEmpty(balance)){
  //   form.resetFields()
  // }else{
  //   edit = true
  //   form.setFieldsValue(balance)
  // }
  const onOk = () => {
    form2.validateFields()
        .then((values) => {
            form2.resetFields();
            onCreate(values);
        })
        .catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

  return (
    <Modal title="Balance" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form2} layout="vertical" name="addBalance" initialValues={{quantity: '0', location: "dummylocation"}}>
       <Form.Item
        name="location"
        hidden={true}
      >
    <Input/>
    </Form.Item>
    <Form.Item
        label="Token"
        name="asset"
        rules={[
          {
            required: true,
            message: 'Enter a token ticker',
          },
        ]}
      >
    <CoinSearch tokens={tokens}/>

    </Form.Item>      
    <Form.Item
        name="quantity"
        hidden={true}
      >
    <InputNumber
        style={{minWidth: "100%"}}
        step="0.000001"
        stringMode
    />
      </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTokenModal;