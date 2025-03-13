import { createContext, useContext } from "react";
import tasksStore from "./TasksStore";

const TaskStoreContext = createContext(tasksStore);
export const useTaskStore = () => useContext(TaskStoreContext);
