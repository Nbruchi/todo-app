import React from "react";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";

const Task = ({ task }) => {
    return (
        <article className="border-b border-solid border-gray-800 dark:border-gray-200 text-black dark:text-white flex gap-2 items-center bg-[#ddd] dark:bg-[#333] py-1 px-4 rounded-lg my-2">
            <Link
                to={`/task/${task.id}`}
                className={`w-full flex flex-col text-lg `}
            >
                <h4 className={`${task.completed && "line-through"}`}>
                    {task.title.length > 30
                        ? `${task.title.substring(0, 30)}...`
                        : task.title}
                </h4>
                <span
                    className={`text-gray-700 dark:text-gray-400 text-[10px] indent-4 `}
                >
                    {task.date}
                </span>
            </Link>
        </article>
    );
};

export default Task;
