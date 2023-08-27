import { useEffect, useState } from "react";

const Currencies = () => {

    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        getSymbols();
    }, [])

    const getSymbols = () => {
        fetch('http://data.fixer.io/api/symbols?access_key=ba2593d138a4ce82dd1a3fb9f3adc861').then(async response => {
            const data = await response.json();
            setSymbols(Object.entries(data.symbols));
        })
    }

    // const test = () => {
    //     fetch('http://data.fixer.io/api/latest?access_key=ba2593d138a4ce82dd1a3fb9f3adc861').then(data => console.log(data));
    // }
    return (
        <div className="container-fluid">
            <div className="border p-4 rounded">
                <div className="row">
                    <div className="col-4 d-flex flex-column justify-content-between">
                        <div>
                            <label className="form-label">Amount</label>
                            <input className="form-control text-center" type="number" />
                        </div>
                        <p className="converted-currency-value mb-0">1.00 EUR = XX XXX USD</p>
                    </div>
                    <div className="col-8">
                        <div className="row justify-content-between align-items-end">
                            <div className="col-5">
                                <label className="form-label">From</label>
                                <select class="form-select">
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
                                <button className="btn btn-primary"><i class="fa-solid fa-arrow-right-arrow-left"></i></button>
                            </div>
                            <div className="col-5">
                                <label className="form-label">To</label>
                                <select class="form-select">
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
                                <button className="btn btn-outline-primary w-100">Convert</button>
                            </div>
                        </div>
                        <div className="row mt-3 align-items-center">
                            <div className="col-7">
                                <p className="converted-currency-value mb-0">XX XXX USD</p>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-outline-primary w-100">More Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Currencies;