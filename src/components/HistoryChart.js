import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto";
import Loader from './Loader';
import chartConfig from "../chartConfig/chartConfig";
import 'chartjs-adapter-date-fns';


function HistoryChart({ setDay, data, error }) {
    const { config } = chartConfig();
    const { time, detail } = data;
    const [cryptoData, setCryptoData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [timeUnit, setTimeUnit] = useState("hour");

    const timeUnitForChart = () => {
        if (timeUnit === "hour") {
            config.scales.x.time.unit = timeUnit;
        } else if (timeUnit === "day") {
            config.scales.x.time.unit = timeUnit;
        } else if (timeUnit === "week") {
            config.scales.x.time.unit = timeUnit;
        } else {
            config.scales.x.time.unit = timeUnit;
        }
    }
    
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            timeUnitForChart();
            const fetchData = () => {
                return setCryptoData({
                    labels: time.map((data) => data.t),
                    datasets: [
                        {
                            label: `${detail.name} price`,
                            data: time.map((data) => data.y),
                            backgroundColor: "rgba(30, 30, 30, 0.5)",
                            borderColor: "rgb(75, 192, 192)",
                            pointRadius: 0,
                            tension: 0.2,
                            fill: true
                        }
                    ]
                })
            }
            fetchData();
            setIsLoading(false);
        }
    }, [timeUnit, time, detail]);

    const renderPrice = () => {
         if (Object.keys(data).length > 0) {
            return (
                <div className='render-price'>
                    <p>
                        Current price: <span className='render-curr-price'>€ {
                            detail.current_price !== null ? detail.current_price.toFixed(2) : "ERROR"
                        }</span>
                    </p>
                    <p>
                        Price change in 24h: <span className={
                            detail.price_change_24h !== null ? (
                                detail.price_change_24h < 0 ? "red" : "green"
                            ) : "red"                            
                    }>{detail.price_change_percentage_24h !== null ? 
                        detail.price_change_percentage_24h.toFixed(2) : "ERROR"}%</span>
                    </p>
                </div>
            )
        }
    }; 

  return (
    <div className='graph'>
       {error && <Loader />}
        {detail && <div>{renderPrice()}</div>}
        {!isLoading && <Line data={cryptoData} options={{...config}} />}
        <div className='btn'>
            <button onClick={() => {setTimeUnit("hour"); setDay(1)}}>
                24h
            </button>
            <button onClick={() => {setTimeUnit("day"); setDay(7)}}>
                7 days
            </button>
            <button onClick={() => {setTimeUnit("day"); setDay(14)}}>
                14 days
            </button>
            <button onClick={() => {setTimeUnit("week"); setDay(30)}}>
                30 days
            </button>
            <button onClick={() => {setTimeUnit("month"); setDay(365)}}>
                1 year
            </button>
        </div>        
    </div>
  );
};

export default HistoryChart;
