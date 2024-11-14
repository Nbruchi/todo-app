import { AnimatePresence } from "framer-motion";
import { nanoid } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/Container";
import TransitionEffect from "../components/TransitionEffect";

const Newtask = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const taskTitle = useStoreState((state) => state.taskTitle);
    const taskBody = useStoreState((state) => state.taskBody);

    const createTask = useStoreActions((actions) => actions.createTask);
    const setTaskTitle = useStoreActions((actions) => actions.setTaskTitle);
    const setTaskBody = useStoreActions((actions) => actions.setTaskBody);

    const canSave = [taskTitle, taskBody].every(Boolean) && isLoading == false;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (canSave) {
            try {
                setIsLoading(true);
                const id = nanoid();
                const date = format(new Date(), "MM dd, pp");
                const newTask = {
                    id,
                    title: taskTitle,
                    body: taskBody,
                    date,
                    completed: false,
                };

                await createTask(newTask);
                setTaskTitle("");
                setTaskBody("");
                toast.success("Task created!");
                navigate("/");
            } catch (error) {
                toast.error("Try again!");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <TransitionEffect />
            <Container
                title="New Task"
                className="w-full h-full flex items-center flex-col justify-start p-2 gap-4"
            >
                <h2 className="title text-2xl font-bold text-center">
                    Create Task
                </h2>
                <form
                    className="flex flex-col w-2/3 gap-2 bg-[#ddd] dark:bg-[#333] p-4 rounded-xl text-black dark:text-white"
                    onSubmit={handleSubmit}
                >
                    <label className="text-md" htmlFor="taskTitle">
                        Task Title:
                    </label>
                    <input
                        type="text"
                        id="taskTitle"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="border border-solid border-black dark:border-white rounded-lg bg-transparent outline-none p-2"
                        autoFocus
                        required
                    />
                    <label className="text-md" htmlFor="taskBody">
                        Task Body:
                    </label>
                    <textarea
                        id="taskBody"
                        value={taskBody}
                        onChange={(e) => setTaskBody(e.target.value)}
                        className="border border-solid border-black dark:border-white rounded-lg bg-transparent outline-none p-2 resize-none"
                        rows={6}
                        required
                    ></textarea>
                    <div className="w-full flex items-center justify-center my-1">
                        <button
                            type="submit"
                            disabled={!canSave}
                            className="p-2 bg-blue-600 disabled:bg-gray-400 text-white disabled:text-gray-600 text-center w-full rounded-xl"
                        >
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </Container>
        </AnimatePresence>
    );
};

export default Newtask;
