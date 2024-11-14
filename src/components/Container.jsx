import React from "react";

const Container = ({ title, children, className }) => {
    document.title = `Todo | ${title}`;
    return (
        <main
            className={`${className} bg-slate-100 text-gray-950 dark:bg-[#242424] dark:text-white`}
        >
            {children}
        </main>
    );
};

export default Container;
