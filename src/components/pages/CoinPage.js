import React, { useState, useEffect,useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './CoinPage.css'
import {useSelector } from 'react-redux';
import Graph from './Graph'
import Loader from './Loader';







function CoinPage() {

    const location = useLocation();
    const { id, image } = location.state;
    const [coin, setCoin] = useState({});
    const theme = useSelector(state=>state.theme);




    useEffect(async () => {
        await axios.get('https://api.coingecko.com/api/v3/coins/' + id)
            .then(res => {
                setCoin(res.data)
                console.log(res.status)
            })
            .catch(error => console.log('error'));
    }, [coin])
    console.log(coin);
    

    console.log(coin);

    return (
        <div className={!theme ? 'coin-page-day':'coin-page-night'}>
            {!coin.market_data && <Loader />}
            {coin.market_data &&
                <div className='coin-page-wrapper'>
                    <div className='coin-info'>
                        <div className='coin-description'>
                            <div>
                                <img className='coin-description-img' src={image} />
                                <p className='coin-description-rank'>Rank {coin.market_data.market_cap_rank}</p>
                            </div>
                            <div className='coin-description-name'>
                                <h1>{coin.name}</h1>
                            </div>
                            <div>
                                <p  className='coin-description-symbol'>{coin.symbol}</p>
                            </div>
                        </div>

                        <div className='coin-info-price'>
                            <div className='coin-info-price-currency'>
                                <h1>${coin.market_data.current_price.usd}</h1>
                                {coin.market_data.price_change_percentage_24h > 0 ? (<p className='green'>{coin.market_data.price_change_percentage_24h}%</p>) :
                                    (<p className='red'>{coin.market_data.price_change_percentage_24h}%</p>)
                                }
                            </div>

                            <div className='coin-info-range'>
                                <div>
                                    low24h: {coin.market_data.low_24h.usd}
                                </div>
                                <div>
                                    high24h: {coin.market_data.high_24h.usd}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='coin-market-value'>
                        <div className='market-cap box'>
                            <p>Market Cap</p>
                            <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                            {coin.market_data.market_cap_change_percentage_24h > 0 ? (<p className='green'>{coin.market_data.market_cap_change_percentage_24h.toLocaleString()}%</p>) :
                                    (<p className='red'>{coin.market_data.market_cap_change_percentage_24h.toLocaleString()}%</p>)
                                }
                        </div>
                        {coin.market_data.fully_diluted_valuation >0 && <div className='fully-diluted-market-cap box'>
                                <p>Fully Diluted market cap</p>
                                <p>${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}</p>
                        </div>}
                        {coin.market_data.total_volume && <div className='volume box'>
                                <p>Volume</p>
                                <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
                        </div>}
                        {coin.market_data.circulating_supply && <div className='circulating-supply'>
                                <p>Circulating Supply</p>
                                <p>${coin.market_data.circulating_supply.toLocaleString()} {coin.symbol}</p>
                        </div>}
                    </div>
                    <div className='coin-market-stats'>
                    <div>
                    <div className='coin-market-graph'>
                                <Graph  id={id} height={600} width={800} size={18}  color={coin.market_data.price_change_percentage_7d > 0 ?'#11d811':'red'}/>
                    </div>
                    </div>
                        <div className='coin-market-stats-wrapper'>
                            <h1 className='coin-market-stats-heading'>{coin.symbol.toUpperCase()} Price Statistics</h1>
                            <div className='coin-market-stat-row'>
                                <p>{coin.name}</p>
                                <p>${coin.market_data.current_price.usd.toLocaleString()}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>Price Change 24h</p>
                                <p>{coin.market_data.price_change_percentage_24h}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>24h Low/24h High</p>
                                <p>${coin.market_data.low_24h.usd} / ${coin.market_data.high_24h.usd}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>Trading Volume</p>
                                <p>{coin.market_data.total_volume.usd.toLocaleString()}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>Public Interest Score</p>
                                <p>{coin.public_interest_score}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>Market Rank</p>
                                <p>{coin.market_data.market_cap_rank}</p>
                            </div>
                            <div className='coin-market-stat-row'>
                                <p>Price Change in 7d</p>
                                {coin.market_data.price_change_percentage_7d > 0 ? (<p className='green'>{coin.market_data.price_change_percentage_7d}%</p>) :
                                    (<p className='red'>{coin.market_data.price_change_percentage_7d}%</p>)
                                }
                            </div>
                        </div>
                    </div>


                </div>

            }

        </div>

    )
}

export default CoinPage
