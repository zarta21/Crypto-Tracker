import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Coin({ searchWord, setMainPage }) {

    const [listOfCoins, setListOfCoins] = useState([]);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=150&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d")
        .then((res) => {
            setListOfCoins(res.data);
            setMainPage(true);
        })
    }, [])

    const filteredCoins = listOfCoins.filter((coin) => {
        return coin.name.toLowerCase().includes(searchWord.toLocaleLowerCase());
    });

  return (
    <div className='cryptoDisplay'>
        {filteredCoins.map((coin) => {
            return (
                <div className='coin' key={coin.id}>
                    <Link to={`/coins/${coin.id}`} className='link'>
                        <img src={coin.image} alt="icon of coin"/>
                        <h1> {coin.name} </h1>
                    </Link>
                    <h3> {coin.symbol.toUpperCase()} </h3>
                    <h3>Price: <span className='price'>€{coin.current_price.toFixed(2)}</span></h3>
                    <h3>
                         Price change in 1h: <span className={
                             coin.price_change_percentage_1h_in_currency < 0 ? "red" : "green"
                             }>
                             {coin.price_change_percentage_1h_in_currency.toFixed(2)} %
                             </span>
                    </h3>
                    <h3>
                         Price change in 24h: <span className={
                             coin.price_change_percentage_24h < 0 ? "red" : "green"
                             }>
                             {coin.price_change_percentage_24h.toFixed(2)} %
                             </span>
                    </h3>
                    <Link to={`/coins/${coin.id}`} className='link'>
                        <button className='btn-more'>
                            More    
                        </button>
                    </Link>
                </div>
            )
        })}
        
    </div>
  )
}

export default Coin;