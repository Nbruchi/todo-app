import { useStoreState } from "easy-peasy";
import React from "react";
import { AnimatePresence } from "framer-motion";

import Container from "../components/Container";
import Task from "../components/Task";
import TransitionEffect from "../components/TransitionEffect";

const Completed = () => {
    const searchResults = useStoreState((state) => state.searchResults);
    const completedTasks = searchResults.filter(
        (task) => task.completed == true
    );
    const sortedTasks = completedTasks.sort((a, b) =>
        b.date.localeCompare(a.date)
    );

    return (
        <AnimatePresence mode="wait">
            <TransitionEffect />
            {searchResults.length < 1 ? (
                <Container
                    className="w-full h-full flex items-center justify-center"
                    title="Task Not Found"
                >
                    <h4 className="title text-2xl font-bold text-center">
                        Task Not found!
                    </h4>
                </Container>
            ) : (
                <Container title="Completed Tasks" className="w-full p-4 gap-4">
                    <h2 className="title text-2xl font-bold text-center my-2">
                        {searchResults.length < 1
                            ? "Task not found!"
                            : " Completed Tasks"}{" "}
                        ({sortedTasks.length})
                    </h2>
                    <div className="p-4">
                        {sortedTasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </div>
                </Container>
            )}
        </AnimatePresence>
    );
};

export default Completed;
