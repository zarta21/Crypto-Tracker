import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';

function DetailPage({ setMainPage }) {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});

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
            const [day, week, twoweeks, month, year, detail] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: "eur",
                        days: "1",
                    },
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: "eur",
                        days: "7",
                    },
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: "eur",
                        days: "14",
                    },
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: "eur",
                        days: "30",
                    },
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
                    params: {
                        vs_currency: "eur",
                        days: "365",
                    },
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/markets/`, {
                    params: {
                        vs_currency: "eur",
                        ids: id,
                    },
                }),
            ]);
            setCoinData({
                day: formatData(day.data.prices),
                week: formatData(week.data.prices),
                twoweeks: formatData(twoweeks.data.prices),
                month: formatData(month.data.prices),
                year: formatData(year.data.prices),
                detail: detail.data[0],
            });
        };
        fetchData();
        setMainPage(false);
    }, []);
    
  return (
    <div>
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
    </div>
  )
}

export default DetailPage;