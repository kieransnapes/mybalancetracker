import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { filter } from 'lodash';

const { Option } = Select;


// const CoinSearch = ({ value = {}, onChange, token_id, tokens, edit}) => {
const CoinSearch = ({ value = {}, onChange, tokens}) => {

const [selected, setSelected] =useState({});

// useEffect(() => {
//     if(edit && tokens.length > 0){
//             let token = tokens.filter(t => t.id === token_id)
//             console.log(tokens)
//             console.log(token)
//             console.log(token_id)
//             if(token.length === 1){
//                 setSelected({'value': token[0].name, 'label': token[0].name})
//             }
//     }
// }, [token_id, setSelected, tokens]);

const handleOnChange = (value) => {
    setSelected(value)
    onChange(tokens.filter(t => t.id === value.key)[0])
}

const options = tokens.map(t => <Option key={t.id} label={t.name}>{t.name}</Option>);
 return (
  <Select
    showSearch
    style={{minWidth: "100%"}}
    placeholder="Select a token"
    onChange={handleOnChange}
    value={selected}
    labelInValue
    // disabled={edit}
  >
      {options}
  </Select>
 );
}
export default CoinSearch;
