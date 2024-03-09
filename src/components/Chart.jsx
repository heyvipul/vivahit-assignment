import { useContext, useEffect, useState } from "react"
import Card from "./Card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import {converUnixTimestamptoDate,convertDatetoUnixTimestamp,createDate} from "../helpers/date.helper.js";
import { fetchHistoricalData } from "../api/stock-api.js";
import { StockContext } from "../context/StockContext.jsx";

const Chart = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");
    const {stockSymbol} = useContext(StockContext)
    
    useEffect(()=>{
        const getDateRange = () => {
            const {days,weeks, months,years} = chartConfig[filter]
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years)

            const startTimestampUnix = convertDatetoUnixTimestamp(startDate)
            const endTimestampUnix = convertDatetoUnixTimestamp(endDate)

            return {startTimestampUnix,endTimestampUnix}
        }

        const updateChartData = async () => {

            try {
                const result = await fetchHistoricalData(stockSymbol)
                setData([result])

            } catch (error) {
                setData([])
                console.log(error);
            }
        }

        updateChartData();

    },[stockSymbol,filter])

    console.log(data);


 

    return <Card>
        <ul className="flex absolute top-2 right-2 z-40">
            {Object.keys(chartConfig).map((item) =>{
                return <li key={item}><ChartFilter text={item} active={filter === item} 
                onClick={()=> setFilter(item)}/></li>
            })}
        </ul>
        <ResponsiveContainer>
        <AreaChart data={data}>
            <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="rgb(199 210 254)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
                </linearGradient>
            </defs>
            <Area
                type="monotone"
                dataKey="value"
                stroke="#312e81"
                fill="url(#chartColor)"
                fillOpacity={1}
                strokeWidth={0.5}
            />
            <Tooltip />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
    </ResponsiveContainer>
        
    </Card>
}

export default Chart