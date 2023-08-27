import { Fragment } from "react";
import Currencies from "../../components/Currencies/Currencies";
import Header from "../Header/Header";
import { Outlet } from 'react-router-dom';

const LayoutWrapper = () => {
    return (
        <Fragment>
            <Header />
            <Currencies />
            <Outlet />
        </Fragment>
    )
}
export default LayoutWrapper;