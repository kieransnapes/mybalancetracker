import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CollectionCreateForm = ({ visible, onCreate, onCancel, token }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add a Balance"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            onCancel();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="addBalance"
        // initialValues={{asset: token.asset, token_id: token.token_id}}
        initialValues={{asset: token.asset, token_id: token.token_id}}
      >
      <Form.Item
        name="asset"
        hidden={true}
      ></Form.Item>
        <Form.Item
        name="token_id"
        hidden={true}
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

const AddBalanceModal = ({onCancel, visible, token, onCreate}) => {

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        token={token}
      />
    </div>
  );
};
export default AddBalanceModal;