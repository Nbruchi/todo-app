import React from "react";
import { Link } from "react-router-dom";

import {
    FaMobileAlt,
    FaTabletAlt,
    FaLaptop,
    FaDesktop,
    FaMoon,
    FaSun,
} from "react-icons/fa";
import useWindow from "../hooks/useWindow";
import useTheme from "../hooks/useTheme";

const Header = () => {
    const { width } = useWindow();
    const [mode, setMode] = useTheme();

    return (
        <header className="flex w-full static top-0 py-1 px-4 items-center justify-between bg-[#66d8f5] text-black">
            <Link to="/">
                <img src="/logo.png" alt="logo" className="logo-img" />
            </Link>

            <div className="flex gap-4 items-center">
                <div>
                    {width < 768 ? (
                        <FaMobileAlt className="text-3xl" />
                    ) : width < 992 ? (
                        <FaTabletAlt className="text-3xl" />
                    ) : width < 1500 ? (
                        <FaLaptop className="text-3xl" />
                    ) : (
                        <FaDesktop className="text-3xl" />
                    )}
                </div>
                <button
                    onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    className={`ml-3 flex items-center justify-center rounded-full p-1 sm:mx-1 ${
                        mode === "light"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                    }`}
                >
                    {mode === "dark" ? (
                        <FaSun className="text-xs" />
                    ) : (
                        <FaMoon className="text-xs" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
