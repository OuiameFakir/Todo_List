// TaskContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ITask } from "../types/Type";

interface TaskContextProps {
  children: ReactNode;
}

interface TaskContextValue {
  tasks: ITask[];
  task: ITask;
  filtredTasks: ITask[];
  addTask: (task: ITask) => void;
  updateTask: (taskId: string, updatedTask: ITask) => void;
  deleteTask: (idCard: string) => void;
  filterTasks: (priority: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const TaskProvider: React.FC<TaskContextProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filtredTasks, setFiltredTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>({
    id: "",
    name: "",
    description: "",
    priority: "",
  });

  const addTask = (newTask: ITask) => {
    setTasks([...tasks, newTask]);
    setFiltredTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updatedTask: ITask) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setTasks(updatedTasks);
    setFiltredTasks(updatedTasks);
  };

  const deleteTask = (idCard: string) => {
    const newList = tasks.filter((t) => t.id !== idCard);
    setTasks(newList);
    setFiltredTasks(newList);
  };

  const filterTasks = (priority: string) => {
    console.log(priority);
    if (priority !== "All") {
      const newList = tasks.filter((t) => t.priority === priority);
      setFiltredTasks(newList);
      console.log(newList);
    } else {
      setFiltredTasks(tasks);
    }
  };

  const contextValue: TaskContextValue = {
    tasks,
    task,
    filtredTasks,
    addTask,
    updateTask,
    deleteTask,
    filterTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

const useTaskContext = (): TaskContextValue => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTaskContext };
