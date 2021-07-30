import React, { useState, useEffect } from "react";
import callAPI from "./utils";
import Plot from 'react-plotly.js'
import './Graph.css'

function Graph(props) {
    const { id, height, width, size, curr, color } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [interval, setInterval] = useState('7d');
    const [xdata, setXData] = useState([]);
    const [ydata, setYData] = useState([]);

    useEffect(() => {
        fetchData().then((chartData) => {
            setIsLoading(false);
            setXData(chartData.index);
            setYData(chartData.price);
        });
    }, [curr,interval]);

    const fetchData = async () => {
        let data = { index: [], price: [] };
        let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${curr}&days=${interval}`);
        for (const item of result.prices) {
            data.index.push(new Date(item[0]));
            data.price.push(item[1]);
        }
        return data;
    };

    const changeInterval = (value) => {
        setInterval(value);
    }

    const btns = [{ title: '1d',period: '1d' }, { title: '7d',period: '7d' }, { title: '14d',period: '14d' }, { title: '1m',period: '30d' }, { title: '2m',period: '60d' }, { title: '4m',period: '120d' },{ title: '6m',period: '180d'},{ title: '1y',period: '370d' }];


    return (
        <div>
            <div className='graph-buttons'>
                {btns.map((item, index) => {
                    return (
                        <button className='graph-btn' onClick={() => {
                            changeInterval(item.period);
                        }} >{item.title}</button>
                    )
                })}
            </div>
            <Plot
                data={
                    [{
                        x: xdata,
                        y: ydata,
                        type: 'scatter',
                        marker: { color: color },
                        name: 'Data Testing'
                    }]
                }
                layout={{ width: width, height: height, plot_bgcolor: 'transparent', paper_bgcolor: 'transparent', font: { color: '#d7d7d7', size: size } }}
                config={{ displayModeBar: false }}
            />
        </div>
    );
}

export default Graph;