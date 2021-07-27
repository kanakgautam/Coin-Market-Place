import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './CoinPage.css'
function CoinPage() {

    const location = useLocation();
    const { id, name, image, symbol, price, volume, priceChange_24, marketcap, marketcapRank, circulatingSupply } = location.state;
    const initialState = { name: '', symbol: '', market_data: {} };
    const [coin, setCoin] = useState({});
    const [marketData, setMarketData] = useState(initialState);
    useEffect(async () => {
        await axios.get('https://api.coingecko.com/api/v3/coins/' + id)
            .then(res => {
                setCoin(res.data)
                console.log(res.status)
            })
            .catch(error => console.log('error'));
    }, [coin])
    console.log(coin)

    return (
        <div className='coin-page'>
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
                            <div className='coin-description-symbol'>
                                <p>{coin.symbol}</p>
                            </div>
                        </div>

                        <div className='coin-info-price'>
                            <div className='coin-info-price-currency'>
                                <h1>${coin.market_data.current_price.usd}</h1>
                                {coin.market_data.price_change_percentage_24h > 0 ? (<p className='green'>{coin.market_data.price_change_percentage_24h}</p>) :
                                    (<p className='red'>{coin.market_data.price_change_percentage_24h}</p>)
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
                        <div className='market-cap'>
                            <p>Market Cap</p>
                            <p>${coin.market_data.market_cap.usd}</p>
                        </div>
                        <div className='fully-diluted-market-cap'>
                                <p>Fully Diluted market cap</p>
                                <p>${coin.market_data.fully_diluted_valuation.usd}</p>
                        </div>
                        <div className='volume'>
                                <p>Volume</p>
                                <p>${coin.market_data.total_volume.usd}</p>
                        </div>
                        <div className='circulating-supply'>
                                <p>Circulating Supply</p>
                                <p>${coin.market_data.circulating_supply} {coin.symbol}</p>
                        </div>
                    </div>
                </div>
            }

        </div>

    )
}

export default CoinPage
