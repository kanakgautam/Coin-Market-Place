import React, { useState, useEffect } from "react";
import callAPI from "./utils";
import Plot from 'react-plotly.js'

function SmallGraph(props) {
    const {id,height,width,size,color} = props;
	const [isLoading, setIsLoading] = useState(true);
	const [latestPrice, setLatestPrice] = useState(0);
    const [xdata,setXData]=useState([]);
    const [ydata,setYData]=useState([]);

	useEffect(() => {
		fetchData().then((chartData) => {
			setIsLoading(false);
			setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
            setXData(chartData.index);
            setYData(chartData.price);
		});
	}, []);

	const fetchData = async () => {
		let data = { index: [], price: []};
		let result = await callAPI('https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=usd&days=24h&interval=1h');
		for (const item of result.prices) {
			data.index.push(new Date(item[0]));
			data.price.push(item[1]);
		}
		return data;
	};


	return (
		<div>
            <Plot
                data={
                    [{
                        x:xdata,
                        y:ydata,
                        type:'scatter',
                        marker: {color:color},
                        name:'Data Testing'
                    }]
                }
                layout={ {width: width, height: height, plot_bgcolor:'transparent',paper_bgcolor:'transparent',font:{color:'#d7d7d7',size:size}} }
                config={{displayModeBar:false}}
             />
        </div>
	);
}

export default SmallGraph;