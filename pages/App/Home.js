import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balances from "./Balances";
import AddTokenModal from "./AddToken";
import PieChart from "./PieChart";
import { Row, Col, Statistic, Menu } from "antd";
import { DollarOutlined} from '@ant-design/icons';

const Big = require("big.js");

const Home = () => {
    const [balances, setBalances] = useState([]);
    const [summary, setSummary] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [balanceToEdit, setBalanceToEdit] = useState({});
    const [toEdit, setToEdit] = useState(false);
    const [tokens, setTokens] = useState([{"id": 'loading...', 'label': 'loading...', 'name': 'loading...'}]);
    const [prices, setPrices] = useState([]);
    const [total, setTotal] = useState(Big(0));
    const [data, setData] = useState([]);


    async function get_token_prices() {
    let symbols = summary.map(b => b.token_id)
    let prices = axios.post('/coins', {'symbols':[...symbols]}, {}).then(res => {
      setPrices(res.data)
    })
  }
    async function getTokens(){
        let res = axios.get('/coins', {})
            .then(res => {
                setTokens(res.data)
        });

    }
    async function getSummaries() {
        axios.get('/balances/summary/', {})
        .then(res => {
            setSummary(res.data)
        });
    }
    async function deleteBalance(id){
        let status = axios.delete(`/balance/${id}`, {}).then(res => {return res.status}).catch(err => {return err.status});
        return status
    }
    async function createBalance(values) {
        let id = axios.post('/balances', values, {}).then(res => {
            return res.data
        })

        return id
    }
    async function editBalance(new_balance) {
        axios.put('/balances', new_balance, {})
    }
    useEffect(() => {
        getSummaries()
        getTokens();
    }, []);
    
    useEffect(() => {
        if(summary.length > 0){
            get_token_prices()
        }
    }, [summary]);

    useEffect(() => {
        if(prices.length > 0){
            getData()
        }
    }, [prices]);

    useEffect(() => {
    }, [setPrices, setSummary]);

    const addBalanceSuccess = (values) => {
        let id = createBalance(values).then(id => {
            values.id = id;
            let _summary = [...summary]
            let asset = _summary.filter(s => s.asset.toUpperCase() === values.asset.toUpperCase())[0]
            let index = _summary.indexOf(asset)
            asset.balances = [...asset.balances, values]
            _summary[index] = asset
            setSummary(_summary)
        })
    };

    const addTokenSuccess = (values) => {
        values.token_id = values.asset.id
        values.asset = values.asset.symbol
        let id = createBalance(values).then(id => {
            values.id = id;
            let asset = {'asset': values.asset, 'balances': [values], 'token_id': values.token_id}
            setSummary(summary => [asset, ...summary ])
        })
        setModalVisible(false)
    };
    const setBalanceForForm = (balance, _toEdit) => {
        setToEdit(_toEdit)
        setBalanceToEdit(balance)
        setModalVisible(true)
    }
    const balanceToDelete = (balance) => {
        console.log(balance)
        let _sums = [...summary]
        let _summary = [...summary].filter(s => s.token_id === balance.token_id)[0]
        let index = [...summary].indexOf(_summary)
        let balances = _summary.balances.filter(b => b.id !== balance.id)
        _sums[index].balances = balances

        setSummary(_sums)

        // else{
        //     let index = newSummary.findIndex(_summary)
        //     newSummary[index]['balances'] = _balances
        //     setSummary(newSummary)
        // }
        // console.log(_summary)
        
        deleteBalance(balance.id).then((status) => {
            if(status === 204){
                // setBalances(_balances)
                console.log("success")
            }
        })

    }
    const deleteAsset = (asset) => {
        console.log(asset)
        setSummary([...summary].filter(s => s.token_id != asset.token_id))
        axios.delete(`/asset/${asset.token_id}/`, {}).then(res => {return res.status}).catch(err => {return err.status});
    }
    const onEditBalanceSuccess = (balance, old_balance) => {
        balance.id = old_balance.id
        let _balances = [...balances]
        editBalance(balance)
        const index = _balances.findIndex((item) => balance.id === item.id);
        _balances[index] = balance;
        setModalVisible(false)
        setBalances(_balances)
    }


    const getData = () => {
        let _total = Big(0)
        let _data = summary.map(b=> {
            let token = prices.filter(p => p.id === b.token_id)    
            let item = {}
            if(token.length > 0){
                let price = Big(token[0].current_price)
                item.id = b.token_id
                item.label = b.asset
                if(b.balances.length === 1){
                    let value = Big(b.balances[0].quantity).times(price)
                    _total = _total.plus(value)
                    item.value=value.toNumber()
                }else{
                    
                    let value = b.balances.map(z=>Big(z.quantity)).reduce((c, d) => (c.plus(d))).times(price)
                    _total = _total.plus(value)
                    item.value = value.toNumber()
                }
            }
            return item
        })
        setTotal(_total.toNumber())
        setData(_data)
    }
//     const data = [
//   {
//     "id": "c",
//     "label": "c",
//     "value": 179,
//     // "color": "hsl(208, 70%, 50%)"
//   },
    const modalVisibleHandler = () => {
        setModalVisible(false)
    }
    return (
        <div>
        <Row>
        <Menu mode="horizontal">
        <Menu.Item key="mail" icon={<DollarOutlined />} onClick={()=>{setBalanceForForm({}, false)}}  >
          Add Token
        </Menu.Item>
      </Menu>
        </Row>
        <Row>
        <Col span={14}>
            <Balances summary={summary} prices={prices} toDelete={balanceToDelete} addBalance={addBalanceSuccess} deleteAsset={deleteAsset}/>
        </Col>
        <Col span={10} style={{height: 800}}>
            {prices.length > 0 && 
             <>
                <Statistic title="Portfolio Value" prefix={'$'} value={total} precision={2} valueStyle={{'fontSize':75}} />

                <PieChart data={data}/>
            </>
            }
        </Col>
    </Row>
            <div >
                
            </div>

            <AddTokenModal tokens={tokens} onCancel={modalVisibleHandler} visible={modalVisible} onCreate={addTokenSuccess}/>
        </div>
    );
}
export default Home;