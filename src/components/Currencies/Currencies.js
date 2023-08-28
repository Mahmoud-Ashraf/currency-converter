import { useEffect, useState } from "react";
import useHTTP from "../../Hooks/use-http";
import { useDispatch } from 'react-redux';
import { ConvertionActions } from "../../store/Convertion/Convertion";

const Currencies = () => {

    const { error, sendRequest } = useHTTP();
    const [symbols, setSymbols] = useState([]);
    const [currencies, setCurrencies] = useState({ from: 'EUR', to: 'USD' });
    const [amount, setAmount] = useState(1);
    const [rate, setRate] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        getSymbols();
        convertCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getSymbols = () => {
        sendRequest(
            {
                url: `symbols`,
                method: 'GET'
            },
            data => {
                setSymbols(Object.entries(data.symbols));
            },
            err => { }
        )
    }

    const reverseCurrency = () => {
        setRate(0);
        setCurrencies(prev => {
            return { from: prev.to, to: prev.from }
        })
    }

    const changeFromHandler = (e) => {
        setRate(0);
        setCurrencies(prev => {
            return { from: e.target.value, to: prev.to }
        })
    }
    const changeToHandler = (e) => {
        setRate(0);
        setCurrencies(prev => {
            return { from: prev.from, to: e.target.value }
        })
    }

    const convertCurrency = () => {
        sendRequest(
            {
                url: `latest?base=${currencies.from}&symbols=${currencies.to}`,
                method: 'GET'
            },
            data => {
                setRate(data.rates[currencies.to]);
                dispatch(ConvertionActions.convert({ rate: data.rates[currencies.to], from: currencies.from, to: currencies.to, amount: amount }))
            },
            err => { }
        )
    }

    return (
        <div className="container-fluid">
            <div className="border p-4 rounded">
                <div className="row">
                    <div className="col-4 d-flex flex-column justify-content-between">
                        <div>
                            <label className="form-label">Amount</label>
                            <input className="form-control text-center" value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <p className="converted-currency-value mb-0">1.00 {currencies.from} = {rate || 'XX.XXX'} {currencies.to}</p>
                    </div>
                    <div className="col-8">
                        <div className="row justify-content-between align-items-end">
                            <div className="col-5">
                                <label className="form-label">From</label>
                                <select className="form-select" value={currencies.from} onChange={changeFromHandler}>
                                    {
                                        symbols.map(symbol => {
                                            return (
                                                <option key={symbol[0]} value={symbol[0]}>{symbol[0]} ({symbol[1]})</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary" onClick={reverseCurrency}><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
                            </div>
                            <div className="col-5">
                                <label className="form-label">To</label>
                                <select className="form-select" value={currencies.to} onChange={changeToHandler}>
                                    {
                                        symbols.map(symbol => {
                                            return (
                                                <option key={symbol[0]} value={symbol[0]}>{symbol[0]} ({symbol[1]})</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button className="btn btn-outline-primary w-100" onClick={convertCurrency}>Convert</button>
                                {error && <div className="alert alert-danger mt-3">
                                    {error}
                                </div>}
                            </div>
                        </div>
                        <div className="row mt-3 align-items-center">
                            <div className="col-7">
                                <p className="converted-currency-value mb-0">{amount} {currencies.from} = {(rate * amount) || 'XX.XX'} {currencies.to}</p>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-outline-primary w-100">More Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Currencies;