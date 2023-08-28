import { useSelector } from "react-redux";
import useHTTP from "../../Hooks/use-http";
import { useEffect, useState } from "react";

const ConvertedCard = (props) => {
    const [rate, setRate] = useState(0);
    const convertion = useSelector(state => state.convertion);
    const { sendRequest } = useHTTP();

    useEffect(() => {
        convertCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [convertion.from, props.to]);

    const convertCurrency = () => {
        sendRequest(
            {
                url: `latest?base=${convertion.from}&symbols=${props.to}`,
                method: 'GET'
            },
            data => {
                setRate(data.rates[props.to]);
            },
            err => { }
        )
    }
    return (
        <div className="border rounded p-5 text-center">
            <p className="fs-5 mb-0">1.00 {convertion.from} = {rate || 'XX.XXX'} {props.to}</p>
            <p className="fs-5 mb-0">{convertion.amount} {convertion.from} = {(rate * convertion.amount) || 'XX.XX'} {props.to}</p>
        </div>
    )
}
export default ConvertedCard;