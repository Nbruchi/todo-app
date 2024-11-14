import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Nav from "./Nav";

const Layout = () => {
    return (
        <div className="min-screen flex flex-col border border-solid border-gray-800 dark:border-gray-200 shadow-lg shadow-gray-900 dark:shadow-gray-100 dark:bg-[#242424] w-full">
            <Header />
            <Nav />
            <div className="flex-1 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
