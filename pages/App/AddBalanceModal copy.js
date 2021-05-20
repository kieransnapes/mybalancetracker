import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Modal, Button, Avatar, Typography } from 'antd';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { useForm } from 'antd/lib/form/Form';

// const _ = require('lodash');
const AddBalanceModal = ({ visible, onCreate, onCancel, token_id}) => {
  
  useEffect(() => {
    console.log(token_id)
  }, [token_id]);
  const [form] = Form.useForm();
  // let old_values = balance
  // let edit = false

  // if(_.isEmpty(balance)){
  //   form.resetFields()
  // }else{
  //   edit = true
  //   form.setFieldsValue(balance)
  // }
  const onOk = () => {
    form.validateFields()
        .then((values) => {
            form.resetFields();
            onCreate(values);
        })
        .catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

  return (
    <Modal title="Balance" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="addBalance" initialValues={{token_id: token_id}} >
      <Form.Item
        name="token_id"
        hidden={true}
        value={token_id}
      ></Form.Item>
       <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Where is the token stored?',
          },
        ]}
      >
    {/* <Input disabled={edit}/> */}
    <Input/>
    </Form.Item>    
    <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'Enter an amount',
          },
        ]}
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

export default AddBalanceModal;