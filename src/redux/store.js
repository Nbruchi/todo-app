import { action, computed, createStore, thunk } from "easy-peasy";
import api from "../api/tasks";

export const store = createStore({
    tasks: [],
    setTasks: action((state, payload) => {
        state.tasks = payload;
    }),
    taskTitle: "",
    setTaskTitle: action((state, payload) => {
        state.taskTitle = payload;
    }),
    taskBody: "",
    setTaskBody: action((state, payload) => {
        state.taskBody = payload;
    }),
    editTitle: "",
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: "",
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: "",
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    completed: false,
    setCompleted: action((state, payload) => {
        state.completed = payload;
    }),
    taskCount: computed((state) => state.tasks.length),
    getTaskById: computed((state) => {
        return (id) => state.tasks.find((task) => task.id.toString() === id);
    }),
    createTask: thunk(async (actions, newTask, helpers) => {
        const { tasks } = helpers.getState();
        try {
            const response = await api.post("/tasks", newTask);
            actions.setTasks([...tasks, response.data]);
            actions.setTaskTitle("");
            actions.setTaskBody("");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }),
    updateTask: thunk(async (actions, updatedTask, helpers) => {
        const { tasks } = helpers.getState();
        const { id } = updatedTask;
        try {
            const response = await api.put(`/tasks/${id}`, updatedTask);
            actions.setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...response.data } : task
                )
            );
            actions.setEditTitle("");
            actions.setEditBody("");
            actions.setCompleted(updatedTask.completed);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }),
    deleteTask: thunk(async (actions, id, helpers) => {
        const { tasks } = helpers.getState();
        try {
            await api.delete(`/tasks/${id}`);
            actions.setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }),
});
