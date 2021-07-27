import React, { useEffect, useState } from 'react'
import {Link} from  'react-router-dom'
import './Coin.css'
import ActiveCoin from './ActiveCoin'


export default function Coin(props) {

    const { name, image, symbol, price, volume, priceChange_24,marketcap,marketcapRank,circulatingSupply,id} = props;
    
    

    return (
        <div className='coin-container'>
            <div className='coin-row'>



                <div className='coin'>
                    <p className='coin-rank'>{marketcapRank}</p>
                    <img className='coin-img' src={image} alt='crypto' />
                   <Link to ={{
                       pathname:'/coinPage',
                       state:{id:id, name:name, image:image, symbol:symbol, price:price, volume:volume, priceChange_24:priceChange_24,marketcap:marketcap,marketcapRank:marketcapRank,circulatingSupply:circulatingSupply }
                       }} className='coin-name'><p >{name}</p></Link> 
                    <p className='coin-symbol'>{symbol}</p>
                </div>



                <div className='coin-data'>
                    <p className='coin-price'>${price}</p>
                    {
                        priceChange_24 < 0 ? 
                        (<p className='coin-price-change red'>{priceChange_24}%</p>) 
                        : (<p className='coin-price-change green'>{priceChange_24}%</p>)
                    }
                    <p className='coin-volume'>${volume.toLocaleString()}</p>
                    <p className='coin-marketcap'>
                        {marketcap.toLocaleString()}
                    </p>
                    <p className='coin-circulating-supply'>
                        {circulatingSupply.toLocaleString()}
                    </p>
                </div>


            </div>
        </div>
    )
}
