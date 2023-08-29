import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PageTitle = () => {
    const [showHomeBtn, setShowHomeBtn] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const convertion = useSelector(state => state.convertion);
    const handleViewRegardingToRoute = () => {
        if (location.pathname.includes('home')) {
            setShowHomeBtn(false);
        } else {
            setShowHomeBtn(true);
        }
    }

    useEffect(() => {
        handleViewRegardingToRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-auto">
                    {
                        showHomeBtn ?
                            <h2>{convertion.from} ({convertion.fromName})</h2>
                            :
                            <h2>Currency Converter</h2>
                    }
                </div>
                {
                    showHomeBtn &&
                    <div className="col-3">
                        <button className="btn btn-dark w-100" onClick={() => navigate('/home')}>Back To Home</button>
                    </div>
                }
            </div>
        </div>
    )
}
export default PageTitle;