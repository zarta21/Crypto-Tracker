import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';

function DetailPage({ day, setDay, setMainPage }) {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [err, setErr] = useState(false);
    
    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res, detail] = await Promise.all([
                    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                        params: {
                            vs_currency: "eur",
                            days: day,
                        }
                    }),
                    axios.get(`https://api.coingecko.com/api/v3/coins/markets/`, {
                        params: {
                            vs_currency: "eur",
                            ids: id,
                        },
                    }),
                ])
                setCoinData({
                    time: formatData(res.data.prices),
                    detail: detail.data[0]
                })
            } catch (error) {
                setErr(true)
                alert(`Ups, something wrong happend...\n${error.message}`)
            }
        }

        fetchData()
        setMainPage(false);
    }, [id, setMainPage, day]);
    
  return (
    <div>
        <HistoryChart data={coinData} setDay={setDay} error={err}/>
        <CoinData data={coinData.detail} />
    </div>
  )
}

export default DetailPage;
