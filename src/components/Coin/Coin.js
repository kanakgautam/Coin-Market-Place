import React, { useEffect, useRef, useState } from 'react'
import {Link} from  'react-router-dom'
import './Coin.css'
import axios from 'axios'
import Graph from '../pages/Graph';


export default function Coin(props) {

    const { name, image, symbol, price, volume, priceChange_24,marketcap,marketcapRank,circulatingSupply,total_volume,id} = props;
    // const [coinData,setCoinData]=useState({});
    // useEffect( () => {
    //      axios.get('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=usd&days=7d')
    //         .then(res => {
    //             setCoinData(res.data)
    //             console.log(res.status)
    //         })
    //         .catch(error => console.log('error'));
    // }, [])
    // // console.log(coinData);

    const priceRef = useRef(price);
    const color = priceRef.current>price ? "flash-red": priceRef.current<price ? "flash-green":"";
    // console.log(color);

    return (
        <div className='coin-container'>
         {  <div className='coin-row'>



                <div className='coin'>
                    <p className='coin-rank'>{marketcapRank}</p>
                    <img className='coin-img' src={image} alt='crypto' />
                   <Link to ={{
                       pathname:'/coinPage',
                       state:{id:id, image:image}
                       }} className='coin-name'><p >{name}</p></Link> 
                    <p className='coin-symbol'>{symbol}</p>
                </div>



                <div className='coin-data'>
                    <p className={`coin-price ${color}` }>{price.toLocaleString()}</p>
                    {
                        priceChange_24 < 0 ? 
                        (<p className='coin-price-change red'>{priceChange_24}%</p>) 
                        : (<p className='coin-price-change green'>{priceChange_24}%</p>)
                    }
                    <p className='coin-volume'>{volume.toLocaleString()}</p>
                    <p className='coin-marketcap'>
                        {marketcap.toLocaleString()}
                    </p>
                    <p className='coin-total-volume'>
                        {total_volume.toLocaleString()}
                    </p>
                    <p className='coin-circulating-supply'>
                        <Graph id={id} height={200} width={200}/>
                    </p>
                </div>


            </div>}
        </div>
    )
}
