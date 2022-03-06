import React from 'react'

function CoinData({ data }) {
  return (
    <div>
    {data && (
      <div className='data'>
        <div>
          <div className='data-span'>
            <span className='data-title'>Market Cap: </span>
            <span className='data-value'>€ {data.market_cap}</span>
          </div>
          <hr />
          <br />
          <div className='data-span'>
            <span className='data-title'>Total Supply: </span>
            <span className='data-value'>{data.total_supply} {data.symbol}</span>
          </div>
          <hr />
          <br />
        </div>
        <div>
          <div className='data-span'>
            <span className='data-title'>Circulating Supply: </span>
            <span className='data-value'>{data.circulating_supply} {data.symbol}</span>
          </div>
          <hr />
          <br />
          <div className='data-span'>
            <span className='data-title'>24 Hour Trading Vol: </span>
            <span className='data-value'>€ {data.total_volume}</span>
          </div>
          <hr />
          <br />
          <div className='data-span'>
            <span className='data-title'>24H Volume/Cap: </span>
            <span className='data-value'>{(data.total_volume/data.market_cap).toFixed(4)}</span>
          </div>
          <hr />
          <br />
        </div>
        <div>
          <div className='data-span'>
            <span className='data-title'>24 Hour High: </span>
            <span className='data-value'>€ {data.high_24h}</span>
          </div>
          <hr />
          <br />
          <div className='data-span'>
            <span className='data-title'>24 Hour Low: </span>
            <span className='data-value'>€ {data.low_24h}</span>
          </div>
          <br />
        </div>
      </div>
    )}
    </div>
  )
}

export default CoinData;