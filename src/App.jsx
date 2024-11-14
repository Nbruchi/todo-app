import React, { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useAxios from "./hooks/useAxios";
import Layout from "./components/Layout";
import { 
    Feed, 
    Newtask, 
    Editask, 
    Taskpage, 
    Missing, 
    Completed 
} from "./pages";

const App = () => {
    const { data, isLoading, error } = useAxios("http://localhost:8000/tasks");

    const setTasks = useStoreActions((actions) => actions.setTasks);

    useEffect(() => {
        setTasks(data);
    }, [data, setTasks]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route
                        index
                        element={<Feed isLoading={isLoading} error={error} />}
                    />
                    <Route path="task/">
                        <Route index element={<Newtask />} />
                        <Route path=":id" element={<Taskpage />} />
                        <Route path="edit/:id" element={<Editask />} />
                    </Route>
                    <Route path="*" element={<Missing />} />
                    <Route path="completed" element={<Completed />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={true}
                theme="light"
            />
        </>
    );
};

export default App;
