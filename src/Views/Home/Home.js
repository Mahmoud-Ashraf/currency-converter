import ConvertedCard from "../../components/ConvertedCard/ConvertedCard";

const Home = () => {
    return (

        <div className="container-fluid mt-5">
            <div className="row g-3">
                <div className="col-4">
                    <ConvertedCard to="EGP" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="AED" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="SAR" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="USD" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="QAR" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="INR" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="JPY" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="KWD" />
                </div>
                <div className="col-4">
                    <ConvertedCard to="CNY" />
                </div>
            </div>
        </div>
    )
}
export default Home;