import React, { useState, useEffect } from 'react';
import { Collapse, Button, Image, Statistic, Row, Col } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import BalanceTable from './BalanceTable';
import Big from 'big.js';
import AddBalanceModal from './AddBalanceModal';



const { Panel } = Collapse;

// function callback(key) {
//     console.log(key);
// }

function header(asset, total, price, image, change, deleteAsset){
    return (
        <div>
            <Row>
                <Col span={1}>
                    <Image src={image} width={50} preview={false}/>
                </Col>
                <Col span={3}>
                <h2>{asset.asset}</h2>
                </Col>
                <Col span={5}>
                    <Statistic title="Price" prefix={'$'} value={price} precision={3} />
                </Col>
                <Col span={5}>
                    <Statistic title="Total (USD)" value={price.times(total)} prefix={'$'} precision={2} />
                </Col>
                <Col span={4}>
                    <Statistic title="Quantity" value={total} precision={5} />
                </Col>
                <Col span={4}>
                    <Statistic title="24H Change" value={change} 
                    valueStyle={change > 0 ? { color: '#3f8600' }: { color: '#cf1322' } }
                    prefix={change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    suffix={'%'}
                    precision={2}
                    />
                </Col>
                <Col span={1}>
                <Button type="secondary" shape="circle" style={{marginTop:15}} onClick={() => deleteAsset(asset)}>
                    <DeleteTwoTone twoToneColor="#eb2f96"/>
                </Button>
                </Col>
                
                {!asset.token_id && 
                <Col span={1}>
                <Button type="secondary" icon={<ExclamationCircleOutlined />} style={{marginTop:15}} onClick={()=> alert('hello')} />
                </Col>
                }
            </Row>
        </div>
    )};
    const calculateTotal = (balances) =>{
        if(balances.length > 1){
            return balances.map(z=>Big(z.quantity)).reduce((c, d) => (c.plus(d))).toNumber()

        }else{
            return Big(balances[0].quantity).toNumber()
        } 
    }
    const AssetGroup = ({asset, prices, toDelete, addBalance, deleteAsset}) => {
    let [image, setImage] = useState("")
    let [price, setPrice] = useState(Big(0))
    let [change, setChange] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    let [addAsset, setAddAsset] = useState('')


    useEffect(() => {
        getTokenInfo(asset.token_id)
    }, [asset.token_id, prices]);
    // useEffect(() => {
    //     console.log(price.toNumber())
    // }, [price]);

    const getTokenInfo =(token_id) => {
        if(prices.length > 0){
            let token = prices.filter(p => p.id === token_id)
            if(token.length === 1){
                setImage(token[0].image)
                setPrice(Big(token[0].current_price))
                setChange(token[0].price_change_percentage_24h)
            }
        }
    }

    const modalVisibleHandler = () => {
        setModalVisible(false)
    }
    
    return (
        <>
            {/* {asset ?  */}
            <>
                <Collapse
                ghost
                expandIcon={() => {}}
                >
                <Panel header={header(asset, calculateTotal(asset.balances), price, image, change, deleteAsset)} key="1" >
                <PlusOutlined onClick={() => {
                    setAddAsset({token_id: asset.token_id, asset: asset.asset})
                    setModalVisible(true)
                    }} />

                <BalanceTable balances={asset.balances.filter(b => b.location !== 'dummylocation')} toDelete={toDelete}/>
                </Panel>
                </Collapse>
                <br />
                <AddBalanceModal onCancel={modalVisibleHandler} onCreate={addBalance} visible={modalVisible} token={addAsset}/>
            </>

            {/* } */}
      </>
    );
}

export default AssetGroup;