import { useDispatch } from "react-redux";
import { ConvertionActions } from "../../store/Convertion/Convertion";
import { useNavigate } from "react-router-dom";
import useHTTP from "../../Hooks/use-http";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sendRequest } = useHTTP();
    const goToDetails = (from, to) => {
        convertCurrency(from, to);
        dispatch(ConvertionActions.convert({ from, to }));
        navigate('/details');
    }



    const convertCurrency = (from, to) => {
        sendRequest(
            {
                url: `latest?base=${from}&symbols=${to}`,
                method: 'GET'
            },
            data => {
                dispatch(ConvertionActions.convert({ rate: data.rates[to] }));
            },
            err => { }
        )
    }
    return (
        <header className="header">
            <div className="header-logo">
                <i className="fa-solid fa-coins"></i>
            </div>
            <div className="header-actions">
                <button onClick={() => goToDetails('EUR', 'USD')}>EUR-USD Details</button>
                <button onClick={() => goToDetails('EUR', 'GBP')}>EUR-GBP Details</button>
            </div>
        </header>
    )
}
export default Header;