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
        setChartData([]);
        renderChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [convertion.from, convertion.to])

    const getChartData = (date) => {
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
        for (let index = 1; index <= 12; index++) {
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