import { useStoreState } from "easy-peasy";
import React from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "../components/Loader";
import Task from "../components/Task";
import Container from "../components/Container";
import TransitionEffect from "../components/TransitionEffect";

const Feed = ({ isLoading, error }) => {
    const searchResults = useStoreState((state) => state.searchResults);
    const taskCount = useStoreState((state) => state.taskCount);
    const sortedTasks = searchResults.sort((a, b) =>
        b.date.localeCompare(a.date)
    );

    return (
        <AnimatePresence mode="wait">
            <TransitionEffect />
            <Container title="Home" className="flex flex-col gap-2 py-2 px-6">
                {isLoading && <Loader />}
                {!isLoading && error && (
                    <h4 className="text-red-500 text-center">{error}</h4>
                )}
                {!isLoading && !error && (
                    <div className="w-full h-screen">
                        {searchResults.length < 1 ? (
                            <h4 className="title text-2xl font-bold text-center">
                                No Tasks found!
                            </h4>
                        ) : (
                            <div>
                                <h2 className="title text-2xl font-bold text-center">
                                    All tasks ({sortedTasks.length})
                                </h2>
                                <div>
                                    {sortedTasks.map((task) => (
                                        <Task key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {taskCount < 1 && (
                    <div>
                        <h4 className="title text-3xl font-bold">
                            No Tasks yet!
                        </h4>
                    </div>
                )}
            </Container>
        </AnimatePresence>
    );
};

export default Feed;
