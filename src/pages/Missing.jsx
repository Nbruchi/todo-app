import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";

import Container from "../components/Container";
import TransitionEffect from "../components/TransitionEffect";

const Missing = () => {
    return (
        <AnimatePresence mode="wait">
            <TransitionEffect />
            <Container
                title="Missing"
                className="w-full h-full flex items-center justify-start gap-4 p-4 flex-col dark:bg-[#242424] dark:text-white py-8"
            >
                <h2 className="title text-2xl font-bold">Page Not Found</h2>
                <p className="text-lg text-yellow-500">
                    Well, That's disappointing
                </p>

                <Link
                    to="/home"
                    className="py-3 px-4 rounded-xl text-white flex items-center justify-center text-lg w-32 bg-blue-600"
                >
                    <img src="/back.svg" alt="back" />
                </Link>
            </Container>
        </AnimatePresence>
    );
};

export default Missing;
