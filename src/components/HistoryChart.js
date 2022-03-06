import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto";
import chartConfig from "../chartConfig/chartConfig";
import 'chartjs-adapter-date-fns';


function HistoryChart({ data }) {
    const { config } = chartConfig();
    const { day, week, twoweeks, month, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    const [cryptoData, setCryptoData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const theRightTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "14d":
                return twoweeks;
            case "30d":
                return month;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    useEffect(() => {
        if (day) {
            theRightTimeFormat();
            const fetchData = () => {
                return setCryptoData({
                    labels: theRightTimeFormat().map((data) => data.t),
                    datasets: [
                        {
                            label: `${detail.name} price`,
                            data: theRightTimeFormat().map((data) => data.y),
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
    }, [timeFormat, detail]);

    const renderPrice = () => {
        if (detail) {
            return (
                <div className='render-price'>
                    <p>
                        Current price: <span className='render-curr-price'>€ {detail.current_price.toFixed(2)}</span>
                    </p>
                    <p>
                        Price change in 24h: <span className={
                        detail.price_change_24h < 0 ? "red" : "green"
                    }>{detail.price_change_percentage_24h.toFixed(2)}%</span>
                    </p>
                </div>
            )
        }
    }; 

  return (
    <div className='graph'>
        <div>
            {renderPrice()}
        </div>
       {!isLoading && <Line data={cryptoData} options={{...config}} />}
        <div className='btn'>
            <button onClick={() => {setTimeFormat("24h")}}>
                24h
            </button>
            <button onClick={() => {setTimeFormat("7d")}}>
                7 days
            </button>
            <button onClick={() => setTimeFormat("14d")}>
                14 days
            </button>
            <button onClick={() => setTimeFormat("30d")}>
                30 days
            </button>
            <button onClick={() => setTimeFormat("1y")}>
                1 year
            </button>
        </div>
    </div>
  );
};

export default HistoryChart;