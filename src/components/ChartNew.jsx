
import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockContext } from '../context/StockContext';
import { fetchHistoricalData } from '../api/stock-api';
import Card from './Card';
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';

const ChartNew = () => {

    const { stockSymbol } = useContext(StockContext)
    const [newData, setNewData] = useState([]);
    const [filter, setFilter] = useState("1W");

    useEffect(() => {

        const chartData = async () => {
            try {
                const response = await fetchHistoricalData(stockSymbol)
                setNewData(response);

            } catch (error) {
                console.log({ message: "error from chartnew", error });
            }
        }

        chartData();
    }, [stockSymbol])

    console.log(newData);

    

    return (
        <Card>
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((item) => {
                    return <li key={item}><ChartFilter text={item} active={filter === item}
                        onClick={() => setFilter(item)} /></li>
                })}
            </ul>
            <ResponsiveContainer>
                <AreaChart
                    width={500}
                    height={200}
                    data={Object.entries(newData).map(([key, value]) => ({ name: key, uv: value }))}
                    margin={{
                        top: 40,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default ChartNew