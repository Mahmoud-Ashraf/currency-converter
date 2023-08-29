import { useEffect, useState } from "react";
import useHTTP from "../../Hooks/use-http";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HistoricalChart = () => {
    const { sendRequest } = useHTTP();
    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'Septemper', 'October', 'November', 'December'];
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    // set labels and sort them acoording to current month which months on current year and which from previous year.
    const [labels, setLabels] = useState([...Months.filter((_, i) => i >= month), ...Months.filter((_, i) => i < month)]);
    const convertion = useSelector(state => state.convertion);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: `From ${convertion.from} To ${convertion.to} Through Last Year`,
            },
        },
    };
    useEffect(() => {
        renderChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // if all months data appended to chart data then set this data to chart data.
        if (chartData.length === 12) {
            setData(
                {
                    labels,
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: chartData.sort((a, b) => a.timestamp - b.timestamp).map(item => item.rates[convertion.to]),
                            borderColor: '#FFD700',
                            backgroundColor: '#FFD70066',
                        }
                    ],
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData]);

    useEffect(() => {
        // set chart data and rerender chart for every change on base currency or target currency.
        setChartData([]);
        renderChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [convertion.from, convertion.to])

    const getChartData = (date) => {
        // send request to get data for last day in each month and append this data to chart data.
        sendRequest(
            {
                url: `${date}?&base=${convertion.from}&symbols=${convertion.to}`,
                method: 'GET'
            },
            data => {
                setChartData(prev => [...prev, data]);
            },
            err => { }
        )
    }

    const renderChart = () => {
        // work around because fixer.io historical API needs supscription.
        // i Used historical API with some work around to get the rate of last day of each month for the last year.
        for (let index = 1; index <= 12; index++) {
            // loop through months to get last day in each month and generate the accurate date to get the data.
            index = index < 10 ? ('0' + index) : index;
            if (Number(index) > month) {
                const lastDayOfMonth = new Date(year - 1, index, 0).getDate();
                getChartData(`${year - 1}-${index}-${lastDayOfMonth}`);
            } else {
                const lastDayOfMonth = new Date(year - 1, index, 0).getDate();
                getChartData(`${year}-${index}-${lastDayOfMonth}`);
            }
        }
    }

    return (
        <div className="container-fluid mt-3">
            <div className="border p-4 rounded">
                {data && <Line options={options} data={data} />}
            </div>
        </div>
    )
}
export default HistoricalChart;