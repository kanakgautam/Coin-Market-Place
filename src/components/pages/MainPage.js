import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from '../Coin/Coin'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './MainPage.css'

function App() {



    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);




    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=' + page + '&sparkline=false')
            .then(res => {
                setCoins(res.data)
            })
            .catch(error => console.log(error));
    }, [page, coins])



    const changePage = (num) => {
        console.log('hi');
        console.log(num);
        setPage(Math.max(1, page + num));
        console.log(page);
    }



    const handleChange = event => {
        setSearch(event.target.value);
    }




    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )



    return (


        <div className='main-page'>


            <Header handleChange={handleChange} />



            <div className='coin-table-heading'>


                <div className='coin-heading'>
                    <p className='coin-heading-cell-index'>#</p>
                    <p className='coin-heading-cell-name'>Coin</p>
                </div>



                <div className='coin-data-heading'>
                    <p className='coin-data-heading-cell-price'>Price</p>
                    <p className='coin-data-heading-cell-24h'>24h</p>
                    <p className='coin-data-heading-cell-24h-volume'>24h Volume</p>
                    <p className='coin-data-heading-cell-mkt-cap'>Mkt Cap</p>
                    <p className='coin-data-heading-cell-circulating-supply'>Circulating Supply</p>
                </div>


            </div>



            { filteredCoins.map(coin => {
                return (
                    <Coin key={coin.id}
                        id={coin.id}
                        marketcapRank={coin.market_cap_rank}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.total_volume}
                        price={coin.current_price}
                        priceChange_24={coin.price_change_percentage_24h}
                        marketcap={coin.market_cap}
                        circulatingSupply={coin.circulating_supply}
                    />
                )
            })}



            <Footer changePage={changePage} page={page}/>
        </div>
    )
}

export default App