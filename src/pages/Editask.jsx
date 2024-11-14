import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

import Container from "../components/Container";
import TransitionEffect from "../components/TransitionEffect";

const Editask = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const getTaskById = useStoreState((state) => state.getTaskById);
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const completed = useStoreState((state) => state.completed);

    const updateTask = useStoreActions((actions) => actions.updateTask);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const setCompleted = useStoreActions((actions) => actions.setCompleted);

    const task = getTaskById(id);

    const canSave = [editTitle, editBody].every(Boolean) && isLoading == false;

    useEffect(() => {
        if (task) {
            setEditTitle(task.title);
            setEditBody(task.body);
            setCompleted(task.completed);
        }
    }, [task, setEditBody, setEditTitle, setCompleted]);

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        if (canSave) {
            try {
                setIsLoading(true);
                const date = format(new Date(), "MM dd, pp");
                const updatedTask = {
                    id,
                    title: editTitle,
                    body: editBody,
                    date,
                    completed,
                };

                await updateTask(updatedTask);
                toast.success("Task updated!");
                navigate(`/task/${id}`);
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
                title="Edit Task"
                className="w-full h-full flex items-center flex-col justify-center p-2 gap-4"
            >
                <h2 className="title text-2xl text-center font-bold">
                    Edit Task
                </h2>
                <form
                    className="flex flex-col w-2/3 gap-2 bg-[#f5f5f5] dark:bg-[#333] p-4 rounded-xl text-black dark:text-white"
                    onSubmit={(e) => handleSubmit(e, task.id)}
                >
                    <label className="text-md" htmlFor="editTitle">
                        Task Title:
                    </label>
                    <input
                        type="text"
                        id="editTitle"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border border-solid border-black dark:border-white rounded-lg bg-transparent outline-none p-2"
                        autoFocus
                        required
                    />
                    <label className="text-md" htmlFor="editBody">
                        Task Body:
                    </label>
                    <textarea
                        id="editBody"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="border border-solid border-black dark:border-white rounded-lg bg-transparent outline-none p-2 resize-none"
                        rows={6}
                        required
                    ></textarea>
                    <div className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="postStatus"
                            value={completed}
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="w-6 h-6 cursor-pointer bg-none"
                        />
                        <label htmlFor="postStatus" className="text-md">
                            Mark as complete
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={!canSave}
                            className="p-2 bg-blue-600 disabled:bg-gray-400 text-white disabled:text-gray-600 text-center w-full rounded-xl"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </Container>
        </AnimatePresence>
    );
};

export default Editask;
