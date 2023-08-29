import { Fragment } from "react";
import Currencies from "../../components/Currencies/Currencies";
import Header from "../Header/Header";
import { Outlet } from 'react-router-dom';
import PageTitle from "../PageTitle/PageTitle";

const LayoutWrapper = () => {
    return (
        <Fragment>
            <Header />
            <PageTitle />
            <Currencies />
            <Outlet />
        </Fragment>
    )
}
export default LayoutWrapper;