import { useEffect, useState } from "react";
import useHTTP from "../../Hooks/use-http";
import { useDispatch, useSelector } from 'react-redux';
import { ConvertionActions } from "../../store/Convertion/Convertion";
import { useLocation, useNavigate } from "react-router-dom";

const Currencies = () => {

    const { error, sendRequest } = useHTTP();
    const [symbols, setSymbols] = useState([]);
    const convertion = useSelector(state => state.convertion);
    const [currencies, setCurrencies] = useState({ from: convertion.from, to: convertion.to });
    const [amount, setAmount] = useState(1);
    const [showDetailsBtn, setShowDetailsBtn] = useState(true);
    // const [rate, setRate] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        getSymbols();
        convertCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewRegardingToRoute = () => {
        if (location.pathname.includes('details')) {
            setShowDetailsBtn(false);
        } else {
            setShowDetailsBtn(true);
        }
    }

    useEffect(() => {
        handleViewRegardingToRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        setCurrencies({ from: convertion.from, to: convertion.to });
    }, [convertion.from, convertion.to]);

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
        // setRate(0);
        setCurrencies(prev => {
            return { from: prev.to, to: prev.from }
        })
    }

    const changeFromHandler = (e) => {
        // setRate(0);
        setCurrencies(prev => {
            return { from: e.target.value, to: prev.to }
        })
    }
    const changeToHandler = (e) => {
        // setRate(0);
        setCurrencies(prev => {
            return { from: prev.from, to: e.target.value }
        })
    }

    const convertCurrency = () => {
        const fromName = symbols?.find(symbol => symbol[0] === currencies?.from);
        dispatch(ConvertionActions.convert({ from: currencies.from, to: currencies.to, amount: amount, fromName: fromName ? fromName[1] : '' }))
        sendRequest(
            {
                url: `latest?base=${currencies.from}&symbols=${currencies.to}`,
                method: 'GET'
            },
            data => {
                // setRate(data.rates[currencies.to]);
                dispatch(ConvertionActions.convert({ rate: data.rates[currencies.to] }))
            },
            err => {
                dispatch(ConvertionActions.resetRate());
            }
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
                        <p className="converted-currency-value mb-0">1.00 {convertion.from} = {convertion.rate || 'XX.XXX'} {convertion.to}</p>
                    </div>
                    <div className="col-8">
                        <div className="row justify-content-between align-items-end">
                            <div className="col-5">
                                <label className="form-label">From</label>
                                <select className="form-select" value={currencies.from} onChange={changeFromHandler} disabled={!showDetailsBtn}>
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
                                <p className="converted-currency-value mb-0">{convertion.amount} {convertion.from} = {(convertion.rate * convertion.amount) || 'XX.XX'} {convertion.to}</p>
                            </div>
                            {
                                showDetailsBtn &&
                                <div className="col-5">
                                    <button className="btn btn-outline-primary w-100" onClick={() => navigate('/details')}>More Details</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Currencies;