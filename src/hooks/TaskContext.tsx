// TaskContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../types/Type';


interface TaskContextProps {
  children: ReactNode;
}

interface TaskContextValue {
  tasks: Task[];
  task: Task;
  filtredTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (idCard: string) => void;
  filterTasks: (priority: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const TaskProvider: React.FC<TaskContextProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtredTasks, setFiltredTasks]=useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    id: '',
    name: '',
    description: '',
    priority: '',
  });

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setFiltredTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
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
    console.log(priority)
    if (priority !== 'All') {
      const newList = tasks.filter((t) => t.priority === priority);
      setFiltredTasks(newList);
      console.log(newList)
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
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = (): TaskContextValue => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTaskContext };

