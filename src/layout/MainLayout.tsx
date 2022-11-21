import { Outlet } from "react-router-dom";

import {Header} from '../components'


export default function MainLayout() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}