import Currencies from "../../components/Currencies/Currencies";
import Header from "../Header/Header";
import { Outlet } from 'react-router-dom';

const LayoutWrapper = () => {
    return (
        <div>
            <Header />
            <Currencies />
            <Outlet />
        </div>
    )
}
export default LayoutWrapper;