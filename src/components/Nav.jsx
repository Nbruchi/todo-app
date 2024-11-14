import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
const Nav = () => {
    const tasks = useStoreState((state) => state.tasks);
    const search = useStoreState((state) => state.search);

    const setSearch = useStoreActions((actions) => actions.setSearch);
    const setSearchResults = useStoreActions(
        (actions) => actions.setSearchResults
    );

    useEffect(() => {
        const filteredRsults = tasks.filter(
            (task) =>
                (task.title &&
                    task.title.toLowerCase().includes(search.toLowerCase())) ||
                (task.body &&
                    task.body.toLowerCase().includes(search.toLowerCase()))
        );

        setSearchResults(filteredRsults);
    }, [tasks, search, setSearchResults]);

    return (
        <nav className="flex xs:flex-col sm:flex-col md:flex-row gap-4 w-full items-center justify-between bg-[#333] text-white p-4">
            <div>
                <input
                    type="text"
                    className="border-2 border-solid border-white bg-transparent text-white rounded-lg p-2 w-[200px] outline-none placeholder:text-gray-200"
                    placeholder="Search tasks..."
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <ul className="text-md flex gap-4">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/task">Task</Link>
                </li>
                <li>
                    <Link to="/completed">Done</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
