import { AnimatePresence } from "framer-motion";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/Container";
import TransitionEffect from "../components/TransitionEffect";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Taskpage = () => {
    const { id } = useParams();
    const getTaskById = useStoreState((state) => state.getTaskById);
    const deleteTask = useStoreActions((actions) => actions.deleteTask);

    const task = getTaskById(id);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await deleteTask(id);
            toast.success(`Task deleted!`);
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            <TransitionEffect />
            <Container title={task && task.title}>
                <article className="m-4 bg-[#ddd] dark:bg-[#333] rounded-xl dark:text-white">
                    {task && (
                        <div className="p-4">
                            <h2
                                className={`text-2xl font-bold my-2 text-center ${
                                    task.completed && "line-through"
                                }`}
                            >
                                {task.title}
                            </h2>
                            <p className="text-lg my-2">{task.body}</p>

                            <div className="w-ful flex flex-1 gap-4 items-center justify-center">
                                <Link
                                    to={`/task/edit/${task.id}`}
                                    className="bg-emerald-600 py-3 px-4 rounded-lg text-white text-lg flex items-center justify-center"
                                >
                                    <FaEdit className="text-xl" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(task.id)}
                                    className="py-3 px-4 rounded-xl bg-red-500 text-white flex items-center justify-center text-lg"
                                >
                                    <FaTrashAlt className="text-xl" />
                                </button>
                                <Link
                                    to="/home"
                                    className="py-3 px-4 rounded-xl text-white flex items-center justify-center text-lg bg-blue-600"
                                >
                                    <img src="/back.svg" alt="back" />
                                </Link>
                            </div>
                        </div>
                    )}
                </article>
            </Container>
        </AnimatePresence>
    );
};

export default Taskpage;
